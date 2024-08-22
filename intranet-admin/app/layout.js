import { Montserrat } from "next/font/google"; 
import './globals.css';
import { ToastContainer } from "react-toastify";


const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: "Opcina Centar Admin",
  description: "Developed by Marko Šego",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        {children}
        <ToastContainer/>
      </body>
    </html>
  );
}
