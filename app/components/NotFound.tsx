import ridgeformLogo from '/ridgeform_logo.svg';

export function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <img 
            src={ridgeformLogo} 
            alt="Ridgeform" 
            className="h-10"
          />
        </div>
      </header>

      {/* 404 Content */}
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-[#222A34] mb-4">404</h1>
          <h2 className="text-[#222A34] mb-4">Page Not Found</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. The page may have been moved or doesn't exist.
          </p>
        </div>
      </div>
    </div>
  );
}