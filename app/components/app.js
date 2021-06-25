import request from "./request.js"

export default Vue.component("sinonimizator-app", {
  data: function () {
    return {
      texto: "",
      palavra: "",
      respostaTexto: "",
      respostaPalavra: "",
      loading: false,
      customColorOptions: {
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
    limparResultador() {
      this.respostaPalavra = "";
      this.respostaTexto = "";
    },
    async sinonimizarPalavra() {
      gtag('event', 'click', {
        'event_category': 'sinonimizarPalavra'
      });
      this.respostaPalavra = await this.fazerRequisicao({ palavra: this.palavra });

    },
    async sinonimizarTexto() {
      gtag('event', 'click', {
        'event_category': 'sinonimizarTexto'
      });

      this.respostaTexto = await this.fazerRequisicao({ texto: this.texto });
    },
    async fazerRequisicao(parametros) {
      this.limparResultador();
      this.loading = true;
      let resposta = jsonFormatHighlight(await request(parametros), this.customColorOptions);
      this.loading = false;
      return resposta;
    },
  },
  template: `
	<main id="app" class="content ">
  <div v-if="loading" class="loading modal-backdrop fade show" tabbindex="-1">

  <div class="spinner-border text-light" role="status">
  </div>
</div>
<section class="sinonimizator">
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
</section>
   <footer class="p-2 text-center text-light bg-dark">
  Desenvolvido por @schirrel, com grande agradecimento a plataforma <a class="text-light" href="https://www.sinonimos.com.br/">www.sinonimos.com.br/</a>
  </footer>

</main>
  `
});