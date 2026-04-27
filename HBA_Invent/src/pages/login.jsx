export default function Login(){
  return(
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-6 text-center flex flex-col gap-4 w-80">
            <h1 className="text-3xl font-extrabold">Login</h1>
            <input type="text" placeholder="Username" className="border-2 border-gray-300 rounded-md px-4 py-2" />
            <input type="password" placeholder="Password" className="border-2 border-gray-300 rounded-md px-4 py-2" />
            <button className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 cursor-pointer">Login</button>
        </div>
    </div>
  )
}