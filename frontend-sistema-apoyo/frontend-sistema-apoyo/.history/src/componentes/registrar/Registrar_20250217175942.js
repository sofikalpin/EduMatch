className="h-[48px] bg-[#f0f0f0] text-[#666] border-none rounded-md text-[16px] font-medium cursor-pointer transition-all duration-200 w-[48%]"
                onClick={handleNext}
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h1 className="text-[36px] text-[#1a2b4b] mb-10 font-semibold ">
              Crea una contraseña
            </h1>
            
            <label className="block text-left text-[20px]" htmlFor="password">
              *Contraseña
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Ingresa tu contraseña"
                  className="h-[48px] p-4 border border-[#e0e0e0] rounded-md text-[16px] w-full mt-[5%] box-border pr-10"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </label>
            {errors.password && (
              <span className="text-red-500 text-[12px] mt-1 block">
                {errors.password}
              </span>
            )}

            <label className="block text-left text-[20px]" htmlFor="confirmPassword">
              *Confirmar Contraseña
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirma tu contraseña"
                  className="h-[48px] p-4 border border-[#e0e0e0] rounded-md text-[16px] w-full mt-[5%] box-border pr-10"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </label>
            {errors.confirmPassword && (
              <span className="text-red-500 text-[12px] mt-1 block">
                {errors.confirmPassword}
              </span>
            )}

            <div className="flex justify-between mt-6">
              <button
                className="h-[48px] bg-[#f0f0f0] text-[#666] border-none rounded-md text-[16px] font-medium cursor-pointer transition-all duration-200 w-[48%]"
                onClick={handleBack}
              >
                Volver
              </button>
              <button
                className="h-[48px] bg-[#f0f0f0] text-[#666] border-none rounded-md text-[16px] font-medium cursor-pointer transition-all duration-200 w-[48%]"
                onClick={handleSubmit}
              >
                Registrarme
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};