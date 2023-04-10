import { montserrat } from '@shared/fonts';

const Footer = () => {
  return (
    <footer className="d-flex w-full py-10 z-10">
      <p className={`${montserrat.className} text-center text-white`}>
        © 2022 Bruno Libonati, All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
