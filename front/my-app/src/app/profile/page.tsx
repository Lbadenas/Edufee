'use client';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { DataUser } from '@/store/userData';
import { uploadImage } from '@/helpers/uploadImage';
import { PencilIcon } from '@heroicons/react/24/solid';

export default function ProfileClient() {
  const [file, setFile] = useState<File | null>(null);
  const getUser = DataUser((state) => state.getDataUser);
  const userData = DataUser((state) => state.userData);
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    getUser()
  }, [getUser]);

  const handleViewFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setFile(file);
      const data = await uploadImage(file, userData.id!);
      if (data.ok) {
        swal({
          title: "Imagen subida correctamente",
          text: "Tu imagen de perfil ha sido actualizada",
          icon: "success",
          timer: 4000,
        });
        getUser();
      } else {
        swal({
          title: "Error",
          text: "Hubo un problema al subir la imagen",
          icon: "error",
          timer: 4000,
        });
      }
    }
  };

  const handleButtonClick = () => {
    document.getElementById('fileInput')?.click();
  };

  if (isLoading) return <div className='text-black text-3xl absolute top-1/2 left-1/2 translate-x-0 -translate-y-1/2'>Loading...</div>;

  if (error) return <div className='text-black text-3xl absolute top-1/2 left-1/2 translate-x-0 -translate-y-1/2'>{error.message}</div>;

  return (
    <div className="h-screen pt-20 flex justify-center gap-12 pb-10 bg-gradient-radial from-[#e0f5f3] to-[#ffffff]">
      <div className="flex flex-col bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl text-black font-medium pt-4 px-6 pb-16">
          Cambiar foto de perfil
        </h1>
        <div className="flex flex-col p-5">
          <div className="relative mx-auto">
            <img
              src={userData.imgProfile! ? userData.imgProfile! : user?.picture!}
              alt="imagen"
              className="w-48 h-48 rounded-full"
            />
            <button
              type="button"
              onClick={handleButtonClick}
              className="absolute -bottom-3 -right-1 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition"
            >
              <PencilIcon className="h-6 w-6 text-black/80" />
            </button>
          </div>
          <input
            id="fileInput"
            onChange={handleViewFile}
            name="file"
            accept=".jpg,.jpeg,.png,.gif,.webp,.avif"
            type="file"
            className="hidden"
          />
        </div>
      </div>
      <div className="border border-black"></div>
      <form className="w-[750px] rounded-xl shadow-lg bg-white p-3">
        <h1 className="text-3xl text-black font-medium p-3">Configuración de perfil</h1>
        <p className="text-black text-sm font-light px-3">Puedes cambiar tus datos personales</p>
        <div className="py-11">
          <div className="grid grid-cols-3 gap-4">
            <div className="p-3">
              <label className="text-black text-lg">Correo:</label>
              <input
                name="email"
                className="h-9 text-black bg-gray-200/40 border-b border-black rounded-t-lg p-2 mb-8 placeholder:p-2 placeholder:italic focus:outline-none"
                placeholder={user?.email!}
                type="email"
              />
            </div>
            <div className="p-3">
              <label className="text-black text-lg">Contraseña actual:</label>
              <input
                name="oldPassword"
                className="h-9 text-black bg-gray-200/40 border-b border-black rounded-t-lg p-2 mb-8 placeholder:p-2 placeholder:italic focus:outline-none"
                placeholder="Contraseña"
                type="password"
              />
            </div>
            <div className="p-3">
              <label className="text-black text-lg">Contraseña nueva:</label>
              <input
                name="password"
                className="h-9 text-black bg-gray-200/40 border-b border-black rounded-t-lg p-2 mb-8 placeholder:p-2 placeholder:italic focus:outline-none"
                placeholder="Contraseña"
                type="password"
              />
            </div>
            <div className="p-3">
              <label className="text-black text-lg">Nombre :</label>
              <input
                name="name"
                className="h-9 text-black bg-gray-200/40 border-b rounded-t-lg border-black p-2 mb-8 placeholder:p-2 placeholder:italic focus:outline-none"
                placeholder={userData?.name || "Nombre"}
                type="text"
              />
            </div>
            <div className="p-3">
              <label className="text-black text-lg">Dirección :</label>
              <input
                name="address"
                className="h-9 text-black bg-gray-200/40 border-b border-black rounded-t-lg p-2 mb-8 placeholder:p-2 placeholder:italic focus:outline-none"
                placeholder={userData?.address || "Dirección"}
                type="text"
              />
            </div>
            <div className="p-3">
              <label className="text-black text-lg">Teléfono :</label>
              <input
                name="phone"
                className="h-9 text-black bg-gray-200/40 border-b border-black rounded-t-lg p-2 mb-8 placeholder:p-2 placeholder:italic focus:outline-none"
                placeholder={userData.phone || "Teléfono"}
                type="text"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-20 -mt-4">
          <button type="submit" className="px-4 py-2 rounded-xl border-2 border-[#55A058] bg-lightorangeinti text-black font-medium hover:scale-105 transition-all duration-300 ease-in-out">Guardar cambios</button>
          <div className="px-4 py-2 rounded-xl border-2 border-red-500 bg-transparent text-black font-medium hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
            Cerrar mi cuenta
          </div>
        </div>
      </form>
    </div>
  );
}
