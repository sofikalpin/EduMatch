<div className="md:w-1/3 flex flex-col items-center justify-center">
  <div className="relative mb-4">
    <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-gray-300 shadow-lg flex items-center justify-center">
      {photo ? (
        <img
          src={photo}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400">No photo</span>
        </div>
      )}
    </div>
  </div>

  <div className="flex flex-col gap-2 items-center justify-center">
    <label
      htmlFor="upload-photo"
      className="flex items-center gap-2 text-blue-600 cursor-pointer text-sm font-medium"
    >
      <Upload size={16} />
      <span>SUBIR FOTO</span>
      <input
        id="upload-photo"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handlePhotoChange}
      />
    </label>

    <button
      onClick={handleDeletePhoto}
      className="flex items-center gap-2 text-red-600 text-sm font-medium"
    >
      <Trash2 size={16} />
      <span>ELIMINAR FOTO</span>
    </button>
  </div>
</div>
