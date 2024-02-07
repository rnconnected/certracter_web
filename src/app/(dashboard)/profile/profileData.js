const getUserData = (user) => {
  return [
    {
      title: "First Name",
      value: `${user?.displayName?.split(" ")[0] || ""}`,
      verify: null,
    },
    {
      title: "Last Name",
      value: `${user?.displayName?.split(" ")[1] || ""}`,
      verify: null,
    },
    {
      title: "Email",
      value: `${user?.email || ""}`,
      verify: null,
    },
    {
      title: "Phone No.",
      value: undefined,
      verify: "Verify",
    },
    {
      title: "Date of Birth",
      value: undefined,
      verify: null,
    },
    {
      title: "State",
      value: undefined,
      verify: null,
    },
    {
      title: "City",
      value: undefined,
      verify: null,
    },
    {
      title: "Zip Code",
      value: undefined,
      verify: null,
    },
  ];
};

export default getUserData;
