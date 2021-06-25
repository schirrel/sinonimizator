import request from "./request.js"

export default Vue.component("sinonimizator-app", {
    data: function() {
        return {
            texto: "",
            palavra: "",
            resultadoFormatado: "",
            resultado: [],
            loading: false,
            modoVisualizacao: true,
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
        async sinonimizarPalavra() {
            gtag && gtag('event', 'click', {
                'event_category': 'sinonimizarPalavra'
            });
            this.fazerRequisicao({ palavra: this.palavra });

        },
        async sinonimizarTexto() {
            gtag && gtag('event', 'click', {
                'event_category': 'sinonimizarTexto'
            });

            this.fazerRequisicao({ texto: this.texto });
        },
        async fazerRequisicao(parametros) {
            this.resultadoFormatado = "";
            this.resultado = []
            this.loading = true;
            this.resultado = await request(parametros);
            this.resultadoFormatado = jsonFormatHighlight(this.resultado, this.customColorOptions);
            this.loading = false;
        },
    },
    template: `
 <main id="app">
    <div v-if="loading" class="loading modal-backdrop fade show" tabbindex="-1">
       <div class="spinner-border text-light" role="status">
       </div>
    </div>
    <section class="content p-4  sinonimizator">
       <div class="btn-group modo-visualizacao" role="group">
          <input type="radio" class="btn-check" v-model="modoVisualizacao" name="modoVisualizacao" id="opcaoTexto" autocomplete="off" :value="true">
          <label class="btn btn-secondary" for="opcaoTexto">Texto</label>
          <input type="radio" class="btn-check" v-model="modoVisualizacao"  name="modoVisualizacao" id="opcaoJSON" autocomplete="off" :value="false">
          <label class="btn btn-secondary" for="opcaoJSON">JSON</label>
       </div>
       <div class="row gx-5">
          <div class="col-12 col-sm-6">
             <section class="px-5 rounded-3">
                <h2>Sinonimize uma palavra</h2>
                <input type="text" class="form-control" v-model="palavra" />
                <button class="align-self-end my-4 btn btn-warning" type="button" @click="sinonimizarPalavra"> Sinonimizar</button>
             </section>
             <section class="p-5 rounded-3">
                <h2>Sinonimize um texto</h2>
                <textarea rows="5" class="form-control" v-model="texto"/>
                <button class="my-4 btn btn-warning" type="button" @click="sinonimizarTexto"> Sinonimizar</button>
             </section>
          </div>
          <div class="col-6 sinonimos-response">
             <div class="visualizacao-texto" v-show="modoVisualizacao">
                <dl>
                   <template :key="item.palavra" v-for="item in resultado">
                      <dt>{{item.palavra}}</dt>
                      <dd>{{item.sinonimos.join(', ')}}</dd>
                      <hr/>
                   </template>
                </dl>
             </div>
             <div class="visualizacao-json " v-show="!modoVisualizacao">
                <pre><code v-html="resultadoFormatado" id="resultado-json" class="json"></code></pre>
             </div>
          </div>
       </div>
    </section>
 </main> 

  `
});