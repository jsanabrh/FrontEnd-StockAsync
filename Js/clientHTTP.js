export async function post(url, info) {

    try {

        const response = await fetch(url, {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(info)
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error");
    }


}

export async function get(url) {

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return data;

    } catch (error) {
        console.error("Error");

    }
}

export async function deleteHttp(url) {

    try {
        const response = await fetch(url, {
            method: "DELETE",
        })

        const data = await response.json();

        return data;

    } catch (error) {
        console.error("Error");

    }
}

export async function update(url, info) {

    try {

        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        });

        const data = await response.json();

        return data;

    } catch (error) {
        console.error("Error");

    }

}