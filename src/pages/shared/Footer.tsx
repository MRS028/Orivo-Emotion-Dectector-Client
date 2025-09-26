const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white">Orivo</h2>
          <p className="mt-3 text-sm">
            Emotion detection powered by AI — text, image & audio.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="mt-3 space-y-2">
            <li><a href="/features" className="hover:text-indigo-400">Features</a></li>
            <li><a href="/about" className="hover:text-indigo-400">About</a></li>
            <li><a href="/contact" className="hover:text-indigo-400">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white">Contact</h3>
          <p className="mt-3 text-sm">Email: support@orivo.ai</p>
          <p className="text-sm">Phone: +880 1234 567 890</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 py-4 text-center text-sm">
        © {new Date().getFullYear()} Orivo. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
