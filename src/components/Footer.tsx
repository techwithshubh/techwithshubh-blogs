import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div>
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
            </div>

            <p className="mt-4 max-w-xs text-white">
              I create courses, resources, and articles delving into advanced
              web development and Gen AI concepts.
            </p>

            <ul className="mt-8 flex gap-6">
              <li>
                <a
                  href="https://www.instagram.com/tech.withshubh/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-white transition hover:opacity-75"
                >
                  <span className="sr-only">Instagram</span>

                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="https://www.youtube.com/@tech.withshubh"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white transition hover:opacity-75"
                >
                  <span className="sr-only">Youtube</span>

                  <svg
                    className="h-6 w-6 fill-white"
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    id="Capa_1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 24 24"
                    width="512"
                    height="512"
                  >
                    <g id="XMLID_184_">
                      <path d="M23.498,6.186c-0.276-1.039-1.089-1.858-2.122-2.136C19.505,3.546,12,3.546,12,3.546s-7.505,0-9.377,0.504   C1.591,4.328,0.778,5.146,0.502,6.186C0,8.07,0,12,0,12s0,3.93,0.502,5.814c0.276,1.039,1.089,1.858,2.122,2.136   C4.495,20.454,12,20.454,12,20.454s7.505,0,9.377-0.504c1.032-0.278,1.845-1.096,2.122-2.136C24,15.93,24,12,24,12   S24,8.07,23.498,6.186z M9.546,15.569V8.431L15.818,12L9.546,15.569z" />
                    </g>
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="https://github.com/techwithshubh"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white transition hover:opacity-75"
                >
                  <span className="sr-only">GitHub</span>

                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            <div>
              <p className="font-medium text-gray-100">Menu</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 transition hover:opacity-75"
                  >
                    {" "}
                    Articles{" "}
                  </a>
                </li>

                <li>
                  <Link
                    href="/resources"
                    className="text-gray-300 transition hover:opacity-75"
                  >
                    {" "}
                    Resources{" "}
                  </Link>
                </li>

                <li>
                  <a
                    href="https://www.youtube.com/@tech.withshubh"
                    target="_blank"
                    className="text-gray-300 transition hover:opacity-75"
                  >
                    {" "}
                    Youtube{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="https://github.com/techwithshubh"
                    target="_blank"
                    className="text-gray-300 transition hover:opacity-75"
                  >
                    {" "}
                    Github{" "}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-100">Contact</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a
                    href="mailto:techwithshubh@outlook.com"
                    className="text-gray-300 transition hover:opacity-75"
                  >
                    {" "}
                    Email{" "}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-100">Helpful Links</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 transition hover:opacity-75"
                  >
                    {" "}
                    E-books{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-gray-300 transition hover:opacity-75"
                  >
                    {" "}
                    Diagrams{" "}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-100">Social</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a
                    href="https://www.youtube.com/@tech.withshubh"
                    target="_blank"
                    className="text-gray-300 transition hover:opacity-75"
                  >
                    {" "}
                    Youtube{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.instagram.com/tech.withshubh/"
                    target="_blank"
                    className="text-gray-300 transition hover:opacity-75"
                  >
                    {" "}
                    Instagram{" "}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-300">
          &copy; 2024. techwithshubh.com . All rights reserved.
        </p>
      </div>
    </footer>
  );
};
