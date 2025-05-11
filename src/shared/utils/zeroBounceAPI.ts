const baseUrl = "https://api.zerobounce.net/v2";

export const validateEamil = async ({
    email
} : {
    email: string
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}):Promise<any> => {
    const uri = `${baseUrl}/validate?api_key=${process.env.ZERO_BOUNCE_API_KEY}&email=${email}`;
     try {
        const response = await fetch(uri, {method: "GET"});
        if(!response.ok) {
            throw new Error(`Http error! Status: ${response.status}`)
        } 
        const data = await response.json();
        return data;
     } catch(error) {
        console.log("Error fetching Zerobunce API: ", error);
        throw error;
     }
}