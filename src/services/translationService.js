import api from "./api";

export const fetchLanguages = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await api.get("/languages");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const translateText = async (text, source, target) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await api.post("/translate", { text, source, target });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const textToSpeech = async (text, lang) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await api.get("/tts", {
      params: { text: encodeURIComponent(text), lang },
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
