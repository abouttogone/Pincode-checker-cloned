// bun.ts
var Check = function (pincode) {
  return pincodeData?.filter((e) => {
    return e.Pincode === pincode;
  });
};
var dataFile = Bun.file("./data/pincodeData.json", {
  type: "application/json",
});
var pincodeData = await dataFile.json();
var server = Bun.serve({
  port: 3000,
  hostname: "localhost",
  fetch(req) {
    const url = new URL(req.url);
    const pincode = url.searchParams.get("check");
    if (!pincode) {
      return new Response(
        JSON.stringify({
          status: "running",
          message: "Enter the Pincode in check query to check the Pincode",
          example: `${url.host}?check=400004`,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
    return new Response(
      JSON.stringify({
        status: "success",
        data: Check(pincode),
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  },
});
console.log(`> Server is up and running on port: ${server.port}`);
