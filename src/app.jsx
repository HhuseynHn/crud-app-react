/** @format */

import React, { useEffect, useRef, useState } from "react";
import HttpService from "./services/httpService";
import axios from "axios";
import { flushSync } from "react-dom";
export default function App() {
  const [users, setUsers] = useState([]);
  const [isNew, setIsNew] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [update, setUpdate] = useState(null);
  const [findUser, setFindUser] = useState();
  const fullNameRef = useRef();
  const countryRef = useRef();
  const cityRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    axios.get("https://basic-ws-2.onrender.com/").then((res) => {
      if (res.data.succes) {
        setUsers(res.data.data);
      }
    });
  }, []);
  function deleteBtn(id) {
    axios.delete("https://basic-ws-2.onrender.com/" + id).then((res) => {
      if (res.data.succes) {
        const dataFilter = users.filter((data) => data.id !== id);
        setUsers(dataFilter);
      }
    });
  }
  function hundleBtn(id) {
    const index = users.findIndex((u) => u.id == id);
    users[index] = {
      fullname: fullNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      address: {
        city: cityRef.current.value,
        country: countryRef.current.value,
      },
    };
  }
  function editBtn(id) {
    setIsEdit(true);
    const user = users.find((usr) => usr.id == id);
    setFindUser(user);
    console.log("U", user);
  }

  async function saveData() {
    const user = {
      fullname: fullNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      address: {
        city: cityRef.current.value,
        country: countryRef.current.value,
      },
    };

    try {
      let response;
      if (update) {
        response = await axios.put("https://basic-ws-2.onrender.com/", {
          ...user,
          id: update.id,
        });
      } else {
        response = await axios.post("https://basic-ws-2.onrender.com/", user);
      }

      if (response.data.succes) {
        if (update) {
          const updateUsers = users.map((u) =>
            u.id === update.id ? response.data.data : u
          );
          setUsers(updateUsers);
        } else {
          setUsers([...users, response.data.data]);
        }
        setIsNew(false);
        setUpdate(null);

        fullNameRef.current.value = "";
        countryRef.current.value = "";
        cityRef.current.value = "";
        emailRef.current.value = "";
        passwordRef.current.value = "";
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div
        className={
          isNew
            ? "opacity-10 mt-[20px] m-auto w-2/12"
            : " mt-[20px] m-auto w-2/12"
        }>
        <button
          onClick={() => setIsNew(true)}
          className="bg-indigo-500 shadow-lg shadow-indigo-500/50 inline-block rounded bg-[green] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]">
          Add new information
        </button>
      </div>

      <div
        className={
          isNew ? "opacity-10 flex flex-col mx-8" : " flex flex-col mx-8"
        }>
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light ">
                <thead className="border-b font-medium dark:border-neutral-500 italic">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      S/N
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Full name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Address
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Acction
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((e, i) => (
                    <tr
                      key={e.id}
                      className="border-b dark:border-neutral-500 ">
                      <td className="whitespace-nowrap px-6 py-4 font-medium flex">
                        {i + 1}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {e.fullname}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">{e.email}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {e.address.country} {e.address.city}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 flex gap-3">
                        <button
                          onClick={() => deleteBtn(e.id)}
                          type="button"
                          className="inline-block rounded bg-[red] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]">
                          Delete
                        </button>

                        <button
                          onClick={() => editBtn(e.id)}
                          type="button"
                          className="inline-block rounded bg-[blue] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal window */}
      {isNew && (
        <>
          <form className="px-7 grid justify-center items-center fixed top-[-100px] left-1/3 right-1/3 bg-emerald-800 top-[50px] pb-[40px] pt-[60px] h-max rounded-2xl">
            <div className="grid gap-6" id="form">
              <div className="grid gap-6 w-full">
                <input
                  className="p-3 shadow-2xl  glass w-full placeholder:text-black outline-none focus:border-solid border-[#035ec5] focus:border-[1px]"
                  type="Text"
                  placeholder="Full name"
                  id="Email"
                  name="email"
                  ref={fullNameRef}
                />
              </div>

              <div className="w-full flex gap-3">
                <input
                  className="capitalize shadow-2xl p-3 ex w-full outline-none focus:border-solid focus:border-[1px] border-[#035ec5] placeholder:text-black"
                  type="text"
                  placeholder="Country"
                  id="First-Name"
                  name="First-Name"
                  required=""
                  ref={countryRef}
                />
                <input
                  className="p-3 capitalize shadow-2xl  glass w-full placeholder:text-black outline-none focus:border-solid focus:border-[1px] border-[#035ec5]"
                  type="text"
                  placeholder="City"
                  id="Last-Name"
                  name="Last-Name"
                  ref={cityRef}
                />
              </div>
              <div className="grid gap-6 w-full">
                <input
                  className="p-3 shadow-2xl  glass w-full placeholder:text-black outline-none focus:border-solid border-[#035ec5] focus:border-[1px]"
                  type="Email"
                  placeholder="Email"
                  id="Email"
                  name="email"
                  ref={emailRef}
                />
                <input
                  className="p-3 shadow-2xl   glass w-full text-black outline-none focus:border-solid focus:border-[1px]border-[#035ec5]"
                  type="date"
                  required=""
                />
              </div>
              <div className="flex gap-3">
                <input
                  className="p-3 glass shadow-2xl  w-full placeholder:text-black outline-none focus:border-solid focus:border-[1px] border-[#035ec5]"
                  type="password"
                  placeholder="Password"
                  id="password"
                  name="password"
                  required=""
                  ref={passwordRef}
                />
                <input
                  className="p-3 glass shadow-2xl  w-full placeholder:text-black outline-none focus:border-solid focus:border-[1px] border-[#035ec5]"
                  type="password"
                  placeholder="Confirm password"
                  required=""
                />
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  saveData();
                  setIsNew(false);
                }}
                className="outline-none glass shadow-2xl  w-full p-3  bg-[#ffffff42] hover:border-[#035ec5] hover:border-solid hover:border-[1px]  hover:text-[#035ec5] font-bold">
                Save
              </button>
            </div>
            <button
              onClick={() => setIsNew(false)}
              type="button"
              className="absolute top-[5px] right-[5px] inline-block rounded-full border-2 border-primary p-2 pb-[2px] pt-[2px] text-xs font-medium uppercase leading-normal text-stone-50 transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10">
              x
            </button>
          </form>
        </>
      )}

      {/* Modal window  EDIT BTN*/}
      {isEdit && (
        <>
          <form className="px-7 grid justify-center items-center fixed top-[-100px] left-1/3 right-1/3 bg-emerald-800 top-[50px] pb-[40px] pt-[60px] h-max rounded-2xl">
            <div className="grid gap-6" id="form">
              <div className="grid gap-6 w-full">
                <input
                  className="p-3 shadow-2xl  glass w-full placeholder:text-black outline-none focus:border-solid border-[#035ec5] focus:border-[1px]"
                  type="Text"
                  placeholder="Full name"
                  id="Email"
                  name="email"
                  ref={fullNameRef}
                  // value={findUser.fullname}
                />
              </div>

              <div className="w-full flex gap-3">
                <input
                  className="capitalize shadow-2xl p-3 ex w-full outline-none focus:border-solid focus:border-[1px] border-[#035ec5] placeholder:text-black"
                  type="text"
                  placeholder="Country"
                  // value={findUser.address.country}
                  id="First-Name"
                  name="First-Name"
                  required=""
                  ref={countryRef}
                />
                <input
                  className="p-3 capitalize shadow-2xl  glass w-full placeholder:text-black outline-none focus:border-solid focus:border-[1px] border-[#035ec5]"
                  type="text"
                  // value={findUser.address.city}
                  placeholder="City"
                  id="Last-Name"
                  name="Last-Name"
                  ref={cityRef}
                />
              </div>
              <div className="grid gap-6 w-full">
                <input
                  className="p-3 shadow-2xl  glass w-full placeholder:text-black outline-none focus:border-solid border-[#035ec5] focus:border-[1px]"
                  type="Email"
                  placeholder="Email"
                  // value={findUser.email}
                  id="Email"
                  name="email"
                  ref={emailRef}
                />
                <input
                  className="p-3 shadow-2xl   glass w-full text-black outline-none focus:border-solid focus:border-[1px]border-[#035ec5]"
                  type="date"
                  required=""
                />
              </div>
              <div className="flex gap-3">
                <input
                  className="p-3 glass shadow-2xl  w-full placeholder:text-black outline-none focus:border-solid focus:border-[1px] border-[#035ec5]"
                  type="text"
                  placeholder="Password"
                  // value={findUser.password}
                  id="password"
                  name="password"
                  required=""
                  ref={passwordRef}
                />
                <input
                  className="p-3 glass shadow-2xl  w-full placeholder:text-black outline-none focus:border-solid focus:border-[1px] border-[#035ec5]"
                  type="password"
                  placeholder="Confirm password"
                  required=""
                />
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  hundleBtn(findUser.id);
                  setIsEdit(false);
                }}
                className="outline-none glass shadow-2xl  w-full p-3  bg-[#ffffff42] hover:border-[#035ec5] hover:border-solid hover:border-[1px]  hover:text-[#035ec5] font-bold">
                Save
              </button>
            </div>
            <button
              onClick={() => setIsEdit(false)}
              type="button"
              className="absolute top-[5px] right-[5px] inline-block rounded-full border-2 border-primary p-2 pb-[2px] pt-[2px] text-xs font-medium uppercase leading-normal text-stone-50 transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10">
              x
            </button>
          </form>
        </>
      )}
    </>
  );
}
