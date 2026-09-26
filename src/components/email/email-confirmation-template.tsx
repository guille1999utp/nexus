import * as React from 'react';
import {  Html,  Tailwind } from '@react-email/components';
import { ContactForm } from '@/types';
// import * as Icons from "@/components/ui/icons";
// import Image from 'next/image';

// const baseUrl = process.env.BASE_URL
//   ? `${process.env.BASE_URL}`
//   : "";


export function EmailTemplate(props: { formData: ContactForm }) {
  const { formData } = props;


  return (
    <Html lang="en">
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                primary: "#6e39fd",
                secondary: "#040a2c",
              },
            },
          },
        }}
      >
        <div className="bg-gray-100 p-6 font-sans">
          <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl mt-4 font-bold mb-4 text-gray-800">
              Thank you for your request, {formData.name}!
            </h1>
            <p className="text-gray-600 mb-6">
              We have received your online forms request. 
            </p>



            {/* Datos del Step Two */}
            <h2 className="text-lg  font-bold mb-4 text-primary">Request</h2>
            <table className="table-auto w-full mb-6">
              <tbody>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Name &/or company:</td>
                  <td className="border px-4 py-2 text-wrap">{formData.name}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Email:</td>
                  <td className="border px-4 py-2">{formData.email}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Interests</td>
                    <td className="border px-4 py-2">{formData.interests.join(', ')}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-semibold">Budget:</td>
                  <td className="border px-4 py-2">{formData.budget}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Message:</td>
                  <td className="border px-4 py-2">{formData.message}</td>
                </tr>
                
              </tbody>
            </table>


            {/* Footer con Redes Sociales */}
            <div className="mt-10 text-center">
              {/* <p className="text-gray-600 mb-4">Stay connected with us on social media!</p> */}

              {/* <Section>
              <Row>
                  <Column align="right">
                    <a href="https://www.instagram.com/fitpup_pb/" aria-label='Instagram Social Media'>
                      <Img
                        src={"https://i.postimg.cc/PCyBwGHR/instagram-logo-svgrepo-com-1.png"}
                        width="32"
                        height="32"
                      />
                    </a>
                  </Column>
                  <Column align="center">
                    <a href="https://www.facebook.com/FITPuppb/" aria-label='Facebook Social Media'>
                      <Img
                        src={"https://i.postimg.cc/NFSZTkhB/facebook-svgrepo-com.png"}
                        width="32"
                        height="32"
                      />
                    </a>

                  </Column>
                  <Column align="left">
                    <a href="https://www.fitpuppb.com/" aria-label='Website www.fitpuppb.com'>
                      <Img
                        src={"https://i.postimg.cc/Gt85cT4N/globe-grid-svgrepo-com.png"}
                        width="32"
                        height="32"
                      />
                    </a>

                </Column>
              </Row>
            </Section> */}

              <p className="text-gray-500 mt-4">© {new Date().getFullYear()} Nexus Labs. All rights reserved.</p>
              {/* <p className="text-gray-500 mt-2">&quot;Your pet&apos;s happiness is our priority!&quot;</p> */}
            </div>
          </div>
        </div>
      </Tailwind>
    </Html>
  );
}

export default EmailTemplate;