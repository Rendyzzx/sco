import axios from 'axios' 
var baseUrl = "https://api.rsnai.org/"
var apiUrl = `https://api.rsnai.org/api`
var GPT_ApiUrl = `${baseUrl}api/v1/user/gpt`
var OpenChat_ApiUrl = `${baseUrl}api/v1/user/openchat`
var Bard_ApiUrl = `${baseUrl}api/v1/user/bard`
var Gemini_ApiUrl = `${baseUrl}api/v1/user/gemini`
var LlamaApiUrl = `${baseUrl}api/v1/user/llama`
var MixtralApiUrl = `${baseUrl}api/v1/user/mixtral`
var ProdiaApiUrl = `${baseUrl}api/v1/user/prodia`
var KandinskyApiUrl = `${baseUrl}api/v1/user/kandinsky`
var AbsolutebeautyApiUrl = `${baseUrl}api/v1/user/absolutebeauty`
var SdxlApiUrl = `${baseUrl}api/v1/user/sdxl`
var DalleApiUrl = `${baseUrl}api/v1/user/dalle`
var IconApiUrl = `${baseUrl}api/v1/user/icon`

var apikey = `rsnai_EFSrkPASH061b7avdAvapm4N`

  async function gpt(prompt) {
    try {
      var payload = {
        prompt: prompt,
      };

      var authHeader = `Bearer ${apikey}`;

      var headers = {
        Authorization: authHeader,
      };

      var response = await axios.post(GPT_ApiUrl, payload, { headers });
      return response.data;
    } catch (error) {
      throw new Error(`RsnChat GPT Error: ${error}`);
    }
  }
  
  async function openchat(prompt) {
    try {
      var payload = {
        prompt: prompt,
      };

      var authHeader = `Bearer ${apikey}`;

      var headers = {
        Authorization: authHeader,
      };

      var response = await axios.post(OpenChat_ApiUrl, payload, { headers });
      return response.data;
    } catch (error) {
      throw new Error(`RsnChat OpenChat Error: ${error}`);
    }
  }
  
  async function bard(prompt) {
    try {
      var payload = {
        prompt: prompt,
      };

      var authHeader = `Bearer ${apikey}`;

      var headers = {
        Authorization: authHeader,
      };

      var response = await axios.post(Bard_ApiUrl, payload, { headers });
      console.log(response)
      return response.data;
    } catch (error) {
      throw new Error(`RsnChat Bard Error: ${error}`);
    }
  }
  
  async function gemini(prompt) {
    try {
      var payload = {
        prompt: prompt,
      };

      var authHeader = `Bearer ${apikey}`;

      var headers = {
        Authorization: authHeader,
      };

      var response = await axios.post(Gemini_ApiUrl, payload, { headers });
      return response.data;
    } catch (error) {
      throw new Error(`RsnChat Gemini Error: ${error}`);
    }
  }
  
  async function llama(prompt) {
    try {
      var payload = {
        prompt: prompt,
      };

      var authHeader = `Bearer ${apikey}`;

      var headers = {
        Authorization: authHeader,
      };

      var response = await axios.post(LlamaApiUrl, payload, { headers });
      return response.data;
    } catch (error) {
      throw new Error(`RsnChat LlaMa Error: ${error}`);
    }
  }
  
  async function mixtral(prompt) {
    try {
      var payload = {
        prompt: prompt,
      };

      var authHeader = `Bearer ${apikey}`;

      var headers = {
        Authorization: authHeader,
      };

      var response = await axios.post(MixtralApiUrl, payload, { headers });
      return response.data;
    } catch (error) {
      throw new Error(`RsnChat Mixtral Error: ${error}`);
    }
  }
  
  async function bing(prompt) {
    try {
      const payload = {
        prompt: prompt,
      };
       
      const headers = {
         Authorization: `Bearer ${apikey}`,
       }
       
      const response = await axios.post(`${apiUrl}/bing`, payload, {
       headers,
      });
      return response.data 
    } catch (error) {
      throw new Error(`RsnChat Bing Error: ${error}`);
    }
  }
         
  async function prodia(prompt, negative_prompt, model) {
    try {
      if (!prompt) {
        return "No prompt provided.";
      }
      
      if (!negative_prompt) {
        return "No negative_prompt provided.";
      }
      
      if (!model) {
        return "No model provided.";
      }
      
      var payload = {
        prompt: prompt,
        negative_prompt: negative_prompt,
        model: model,
      };

      var authHeader = `Bearer ${apikey}`;

      var headers = {
        Authorization: authHeader,
      };

      var response = await axios.post(ProdiaApiUrl, payload, { headers });
      return response.data;
    } catch (error) {
      throw new Error(`RsnChat Prodia Error: ${error}`);
    }
  }
  
  async function kandinsky(prompt, negative_prompt) {
    try {
      if (!prompt) {
        return "No prompt provided.";
      }
      
      if (!negative_prompt) {
        return "No negative_prompt provided.";
      }
      
      var payload = {
        prompt: prompt,
        negative_prompt: negative_prompt,
      };

      var authHeader = `Bearer ${apikey}`;

      var headers = {
        Authorization: authHeader,
      };

      var response = await axios.post(KandinskyApiUrl, payload, { headers });
      return response.data;
    } catch (error) {
      throw new Error(`RsnChat Kandinsky Error: ${error}`);
    }
  }
  
  async function absolutebeauty(prompt, negative_prompt) {
    try {
      if (!prompt) {
        return "No prompt provided.";
      }
      
      if (!negative_prompt) {
        return "No negative_prompt provided.";
      }
      
      var payload = {
        prompt: prompt,
        negative_prompt: negative_prompt,
      };

      var authHeader = `Bearer ${apikey}`;

      var headers = {
        Authorization: authHeader,
      };

      var response = await axios.post(AbsolutebeautyApiUrl, payload, { headers });
      return response.data;
    } catch (error) {
      throw new Error(`RsnChat Absolutebeauty Error: ${error}`);
    }
  }
  
  async function sdxl(prompt, negative_prompt) {
    try {
      if (!prompt) {
        return "No prompt provided.";
      }
      
      if (!negative_prompt) {
        return "No negative_prompt provided.";
      }
      
      var payload = {
        prompt: prompt,
        negative_prompt: negative_prompt,
      };

      var authHeader = `Bearer ${apikey}`;

      var headers = {
        Authorization: authHeader,
      };

      var response = await axios.post(SdxlApiUrl, payload, { headers });
      return response.data;
    } catch (error) {
      throw new Error(`RsnChat Sdxl Error: ${error}`);
    }
  }
  
  async function dalle(prompt) {
    try {
      if (!prompt) {
        return "No prompt provided.";
      }
      
      var payload = {
        prompt: prompt,
      };

      var authHeader = `Bearer ${apikey}`;

      var headers = {
        Authorization: authHeader,
      };

      var response = await axios.post(DalleApiUrl, payload, { headers });
      return response.data;
    } catch (error) {
      throw new Error(`RsnChat Dalle Error: ${error}`);
    }
  }
  
  async function icon(prompt) {
    try {
      if (!prompt) {
        return "No prompt provided.";
      }
      
      var payload = {
        prompt: prompt,
      };

      var authHeader = `Bearer ${apikey}`;

      var headers = {
        Authorization: authHeader,
      };

      var response = await axios.post(IconApiUrl, payload, { headers });
      return response.data;
    } catch (error) {
      throw new Error(`RsnChat Icon Error: ${error}`);
    }
  }

export {
  kandinsky,
  absolutebeauty,
  sdxl,
  dalle,
  icon,
  prodia,
  openchat,
  bard,
  bing,
  gemini,
  llama,
  gpt,  
  mixtral,  
}