import type { Place } from "./types";

const dataFile = Bun.file("./data/pincodeData.json", {
  type: "application/json",
});

const pincodeData: Place[] = await dataFile.json();

function Check(pincode: string) {
  return pincodeData?.filter((e) => {
    return e.Pincode === pincode;
  });
}

const server = Bun.serve({
  port: 3000,
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
