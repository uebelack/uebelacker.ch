import { scroller } from 'react-scroll';

export default function ScrollButton({ target }: { target: string }) {
  return (
    <button
      className="scroll-button"
      type="button"
      onClick={() => scroller.scrollTo(target, { offset: -94, duration: 500, smooth: true })}
    />
  );
}
