export default function LoginPage() {
  //bg-gradient-to-r from-emerald-400 to-emerald-500
  return (
    <div className="h-screen flex items-center justify-center pattern">
      <form
        action=""
        className="p-4 rounded-md max-w-md w-full shadow-md bg-white"
      >
        <label htmlFor="username">Usuario</label>
        <input type="text" name="username" id="username" />
        <label htmlFor="password">Contraseña</label>
        <input type="password" name="password" id="password" />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded-md p-2 uppercase"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  )
}
