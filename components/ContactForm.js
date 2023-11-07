import React, { useState, useCallback } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { GoogleReCaptchaProvider, GoogleReCaptcha } from 'react-google-recaptcha-v3';
import LazyLoad from 'react-lazyload';
import { useCookieConsent } from './CookieConsent';
import Form from './Form';
import InputText from './InputText';
import Textarea from './Textarea';
import Checkbox from './Checkbox';

import Button from './Button';

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
    <LazyLoad offset={100}>
      { cookiesAccepted ? (
        <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
          <GoogleReCaptcha onVerify={handleOnCaptchaVerify} />
        </GoogleReCaptchaProvider>
      ) : (<p className="mb-5"><FormattedMessage id="contact.cookie" /></p>)}
      { state === 'initial' && (
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
              <Checkbox
                name="privacy"
                disabled={isSubmitting || !captcha}
              >
                <FormattedMessage id="contact.privacy_1" />
                {' '}
                <a href={formatMessage({ id: 'contact.privacy_link' })} className="underline" aria-label="Privacy">
                  <FormattedMessage id="contact.privacy_2" />
                </a>
              </Checkbox>
              <Button id="contact-form-button" type="submit" disabled={isSubmitting || !captcha}>
                <FormattedMessage id="contact.submit" />
              </Button>
            </Form>
          )}
        </Formik>
      )}
      { state === 'submitted' && (
        <p className="contact-form-success">{formatMessage({ id: 'contact.success' })}</p>
      )}
      { state === 'error' && (
        <p className="contact-form-error">{formatMessage({ id: 'contact.error' })}</p>
      )}

    </LazyLoad>
  );
}
