export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Blissful. All rights reserved.
        </p>
        {/* <p className="text-sm mt-2">
          Made with <span className="text-red-600">❤</span> by Your Company
        </p> */}
      </div>
    </footer>
  );
}
