import request from "./request.js"

export default Vue.component("sinonimizator-app", {
  data: function () {
    return {
      texto: "",
      palavra: "",
      respostaTexto: "",
      respostaPalavra: "",
      loading: false,
      customColorOptions : {
        keyColor: 'green; font-weight: bold',
        numberColor: 'red',
        stringColor: 'purple',
        trueColor: '#00cc00',
        falseColor: '#ff8080',
        nullColor: 'cornflowerblue'
    }
    };
  },
  methods: {
    async sinonimizarPalavra() {
      this.respostaPalavra = "";
      this.respostaTexto = "";
      this.loading = true;
      this.respostaPalavra = jsonFormatHighlight(await request({ palavra: this.palavra }), this.customColorOptions);
      this.loading = false;

    },
    async sinonimizarTexto() {
      this.respostaPalavra = "";
      this.respostaTexto = "";
      this.loading = true;
      this.respostaTexto = jsonFormatHighlight(await request({ texto: this.texto }), this.customColorOptions);
      this.loading = false;

    }
  },
  template: `
	<main id="app" class="content ">
  <div v-if="loading" class="loading modal-backdrop fade show" tabbindex="-1">

  <div class="spinner-border text-light" role="status">
  </div>
</div>
   <div class="row gx-5">
      <div class="col-6">
         <section class="p-5 rounded-3">
            <h2>Sinonimize uma palavra</h2>
            <textarea class="form-control" v-model="palavra" />
            <button class="my-4 btn btn-dark" type="button" @click="sinonimizarPalavra"> Sinonimizar</button>
         </section>
      </div>
      <div class="col-6 json-response">
      
      <pre><code v-html="respostaPalavra" id="word-json" class="json"></code></pre>
      </div>
   </div>
   <div class="row gx-5">
      <div class="col-6">
      <section class="p-5 rounded-3">
         <h2>Sinonimize um texto</h2>
         <textarea class="form-control" v-model="texto"/>
         <button class="my-4 btn btn-dark" type="button" @click="sinonimizarTexto"> Sinonimizar</button>
      </section>
      </div>
      <div class="col-6 json-response">
      <pre><code v-html="respostaTexto" id="text-json" class="json"></code></pre>
      </div>
   </div>
</main>
  `
});