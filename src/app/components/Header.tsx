export const Header = () => {
  return (
    <header className="bg-black sticky">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <a className="flex flex-row items-center text-white gap-2" href="#">
              <span className="sr-only">Home</span>
              <svg
                className="h-6 w-6 fill-pastal-blue"
                xmlns="http://www.w3.org/2000/svg"
                id="Layer_1"
                data-name="Layer 1"
                viewBox="0 0 24 24"
                width="512"
                height="512"
              >
                <path d="M18,8.5a2.5,2.5,0,0,1-5,0A2.5,2.5,0,0,1,18,8.5Zm-.006,6.866a11.065,11.065,0,0,1-1.163,4.569A7.634,7.634,0,0,1,10,24H9V18.5A3.517,3.517,0,0,0,5.5,15H0V14A7.634,7.634,0,0,1,4.065,7.169,11.065,11.065,0,0,1,8.634,6.006,15.487,15.487,0,0,1,20.972,0h0A3.009,3.009,0,0,1,24,3,15.507,15.507,0,0,1,17.994,15.366ZM2.084,13H4.346A34.361,34.361,0,0,1,6.955,8.237a8.993,8.993,0,0,0-1.993.72A5.519,5.519,0,0,0,2.084,13Zm13.679,4.045A34.361,34.361,0,0,1,11,19.654v2.262a5.519,5.519,0,0,0,4.043-2.878A8.993,8.993,0,0,0,15.763,17.045ZM22,2.972A1,1,0,0,0,21,2c-5.16.147-8.65,2.124-12.018,6.822a29.92,29.92,0,0,0-2.471,4.271,5.5,5.5,0,0,1,4.4,4.4,29.92,29.92,0,0,0,4.271-2.471C19.876,11.65,21.853,8.16,22,2.972ZM6.122,17.879a3.015,3.015,0,0,1,0,4.242c-.907.906-3.622,1.465-4.748,1.664l-1.406.247.247-1.406c.2-1.126.758-3.841,1.664-4.748A3.073,3.073,0,0,1,6.122,17.879ZM5,20a.993.993,0,0,0-.293-.707,1,1,0,0,0-1.414,0A7.318,7.318,0,0,0,2.5,21.5a7.342,7.342,0,0,0,2.208-.794A.993.993,0,0,0,5,20Z" />
              </svg>
              <em className="font-semibold text-lg">techwithshubh.com</em>
            </a>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <a
                    className="text-white transition hover:text-pastal-blue text-lg font-semibold"
                    href="#"
                  >
                    {" "}
                    Articles{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-white transition hover:text-pastal-blue text-lg font-semibold"
                    href="#"
                  >
                    {" "}
                    Resources{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-white transition hover:text-pastal-blue text-lg font-semibold"
                    href="#"
                  >
                    {" "}
                    Github{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-white transition hover:text-pastal-blue text-lg font-semibold"
                    href="#"
                  >
                    {" "}
                    Youtube{" "}
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
