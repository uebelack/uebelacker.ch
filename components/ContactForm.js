import React, { useState, useCallback } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { GoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useCookieConsent } from './CookieConsent';
import Form from './Form';
import InputText from './InputText';
import Textarea from './Textarea';
import Checkbox from './Checkbox';
import Button from './Button';
import Reveal from './Reveal';

export default function ContactForm() {
  const cookiesAccepted = useCookieConsent();
  const { formatMessage } = useIntl();
  const [state, setState] = useState('initial');
  const [captcha, setCaptcha] = useState(undefined);

  const ContactSchema = Yup.object().shape({
    email: Yup.string()
      .email(formatMessage({ id: 'contact.email_error' }))
      .required(formatMessage({ id: 'contact.email_error' })),
    subject: Yup.string()
      .required(formatMessage({ id: 'contact.subject_error' })),
    message: Yup.string()
      .required(formatMessage({ id: 'contact.message_error' })),
    privacy: Yup.bool().oneOf([true], formatMessage({ id: 'contact.privacy_error' })),
  });

  const handleOnCaptchaVerify = useCallback((token) => {
    setCaptcha(token);
  }, []);

  const handleOnSubmit = async (values) => {
    try {
      await axios.post('/api/contact', { ...values, captcha });
      setState('submitted');
    } catch (error) {
      setState('error');
    }
  };

  return (
    <div className="contact-layout">
      <div>
        {/* The provider lives in _app (see CaptchaProvider) — one for the whole
            app, because the shell's `mail` command needs a token too and two
            providers fight over the same script tag. */}
        {cookiesAccepted ? (
          <GoogleReCaptcha onVerify={handleOnCaptchaVerify} />
        ) : (
          <p className="form-notice"><FormattedMessage id="contact.cookie" /></p>
        )}

        {state === 'initial' && (
          <Formik
            initialValues={{
              email: '', subject: '', message: '', captcha: '', privacy: false,
            }}
            validationSchema={ContactSchema}
            onSubmit={handleOnSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputText
                  name="email"
                  placeholder={formatMessage({ id: 'contact.email_placeholder' })}
                  disabled={isSubmitting || !captcha}
                />
                <InputText
                  name="subject"
                  placeholder={formatMessage({ id: 'contact.subject_placeholder' })}
                  disabled={isSubmitting || !captcha}
                />
                <Textarea
                  name="message"
                  placeholder={formatMessage({ id: 'contact.message_placeholder' })}
                  disabled={isSubmitting || !captcha}
                />
                <Checkbox name="privacy" disabled={isSubmitting || !captcha}>
                  <span>
                    <FormattedMessage id="contact.privacy_1" />
                    {' '}
                    <a href={formatMessage({ id: 'contact.privacy_link' })} aria-label="Privacy">
                      <FormattedMessage id="contact.privacy_2" />
                    </a>
                  </span>
                </Checkbox>
                <div className="mt-4">
                  <Button id="contact-form-button" type="submit" disabled={isSubmitting || !captcha}>
                    <FormattedMessage id="contact.submit" />
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        )}

        {state === 'submitted' && (
          <p className="form-result form-result--success contact-form-success">
            <span className="form-result__icon" aria-hidden="true">✓</span>
            {formatMessage({ id: 'contact.success' })}
          </p>
        )}

        {state === 'error' && (
          <p className="form-result form-result--error contact-form-error">
            <span className="form-result__icon" aria-hidden="true">!</span>
            {formatMessage({ id: 'contact.error' })}
          </p>
        )}
      </div>

      {/* The details someone who does not want to fill in a form still needs. */}
      <Reveal delay={80}>
        <div className="contact-card">
          <div className="card__meta mb-5"><FormattedMessage id="contact.aside_title" /></div>

          <div className="contact-card__label"><FormattedMessage id="contact.aside_email_label" /></div>
          <div className="contact-card__value">
            <a href="mailto:support@uebelacker.dev">support@uebelacker.dev</a>
          </div>

          <div className="contact-card__label"><FormattedMessage id="contact.aside_location_label" /></div>
          <div className="contact-card__value"><FormattedMessage id="contact.aside_location_value" /></div>

          <div className="contact-card__label"><FormattedMessage id="contact.aside_response_label" /></div>
          <div className="contact-card__value"><FormattedMessage id="contact.aside_response_value" /></div>

          <div className="contact-card__label"><FormattedMessage id="contact.aside_privacy_label" /></div>
          <div className="contact-card__value text-sm" style={{ color: 'var(--sw-comment)' }}>
            <FormattedMessage id="contact.privacy_info" />
          </div>
        </div>
      </Reveal>
    </div>
  );
}
