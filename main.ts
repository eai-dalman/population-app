/**
 * Fetches JSON data from the server.
 * @returns {Promise<any>} A promise that resolves to the JSON data.
 */
async function getJSONData(): Promise<any> {
  try {
    const baseURL: string = window.location.origin;
    const response: Response = await fetch(`${baseURL}/data.json`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: any = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching JSON:", err.message);
    throw err;
  }
}

/**
 * Creates a card element based on the provided data.
 * @param {Object} cardData - The data used to create the card.
 * @param {Array<Object>} cardData.countries - An array of countries with count and name.
 * @param {string} cardData.gender - The gender associated with the card.
 * @param {string} cardData.primary_color - The primary color for styling.
 * @param {string} cardData.secondary_color - The secondary color for styling.
 * @param {number} cardData.total - The total count associated with the card.
 */
function createCard({
  countries,
  gender,
  primary_color,
  secondary_color,
  total,
}: {
  countries: { count: number; name: string }[];
  gender: string;
  primary_color: string;
  secondary_color: string;
  total: number;
}): void {
  const template: HTMLTemplateElement = document.createElement("template");
  template.innerHTML = `
    <div class="card-container">
      <h2 class="card-title">${total}<span>${gender}</span></h2>

      <div class="content-container">
        <span class="card-label">By country</span>
        <section class="small-cards-section">
          ${countries
            .map(
              (item) => `
              <div class="small-card-container" style="background-color: ${primary_color};">
                <div class="card-count" style="background-color: ${secondary_color};">${item.count}</div>
                <div class="card-country">${item.name}</div>
              </div>`
            )
            .join("")}
        </section>
      </div>
    </div>`;

  // Render
  const card: Element = template.content.firstElementChild!;
  const container: HTMLElement | null =
    document.getElementById("cards-section");
  if (container) {
    container.appendChild(card);
  }
}

/**
 * Displays cards on the webpage by fetching data and creating cards.
 */
async function displayCards(): Promise<void> {
  try {
    const response: any = await getJSONData();
    const data: any[] = response.populations;
    data.map((item: any) => createCard(item));
  } catch (err) {
    console.error("Error in display cards:", err.message);
  }
}

// Initial call to display cards
displayCards();
