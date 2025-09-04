export default function BackgroundShapes() {
  return (
    <>
      {/* Clean professional background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white -z-10"></div>
      
      {/* Floating Background Shapes */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Large Circle */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full opacity-30 animate-float-slow"></div>
        
        {/* Medium Square */}
        <div className="absolute top-1/3 left-10 w-32 h-32 bg-gradient-to-br from-gray-200 to-gray-300 rotate-45 opacity-20 animate-float"></div>
        
        {/* Small Circle */}
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full opacity-25 animate-float"></div>
        
        {/* Triangle */}
        <div className="absolute bottom-20 left-1/4 w-0 h-0 opacity-15 animate-float-slow"
             style={{
               borderLeft: '40px solid transparent',
               borderRight: '40px solid transparent',
               borderBottom: '70px solid #e5e7eb'
             }}>
        </div>
        
        {/* Rectangle */}
        <div className="absolute top-1/2 right-1/3 w-16 h-40 bg-gradient-to-b from-gray-200 to-gray-300 opacity-20 animate-float transform rotate-12"></div>
        
        {/* Small Squares scattered */}
        <div className="absolute top-1/4 left-1/3 w-8 h-8 bg-gray-200 opacity-30 animate-float rotate-45"></div>
        <div className="absolute bottom-1/3 left-1/2 w-6 h-6 bg-gray-300 opacity-25 animate-float-slow"></div>
        <div className="absolute top-3/4 right-1/2 w-10 h-10 bg-gray-200 opacity-20 animate-float"></div>
      </div>
    </>
  );
}
