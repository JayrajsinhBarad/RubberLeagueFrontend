export default function Footer() {
  return (
    <footer className="bg-[#0F111A] text-gray-400 py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        {/* Section 1: Logo + About */}
        <div>
          <h2 className="text-white text-xl font-bold mb-2">Valorant Tournaments</h2>
          <p>Compete, win, and rise to the top. Join tournaments and show your skills!</p>
        </div>

        {/* Section 2: Navigation Links */}
        <div>
          <h3 className="text-white font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#tournaments" className="hover:text-white">Tournaments</a></li>
            <li><a href="#" className="hover:text-white">Register</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Section 3: Social Media */}
        <div>
          <h3 className="text-white font-semibold mb-2">Follow Us</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-white">Discord</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center mt-8 text-xs text-gray-500 border-t border-gray-700 pt-4">
        © 2025 Valorant Tournaments. All rights reserved.
      </div>
    </footer>
  );
}
