import Photo from "../components/Pic/Photo"

const apiKey = 'YV1Tqqtl_RjEDI5RU_otft9XbtAEDRzVGh4slG07_Pc'

export default function getPics({ keyword = 'rain', page = 0, limit= 25 } = {}) {
const apiURL = `https://api.unsplash.com/search/photos?query=${keyword}&page=${page + 1}&per_page=${limit}&client_id=${apiKey}&_=${Date.now()}`;
  console.log("Página actual:", page + 1);

  return fetch(apiURL)
    .then(res => res.json())
    .then(response => {
      const { results = [] } = response

      const pics = results.map(Photo => {
        const { id, description, urls } = Photo
        return {
          id,
          description,
          url: urls.regular
        }
      })

      return pics
    })
}