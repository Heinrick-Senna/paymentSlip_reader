# paymentSlip_reader

Para iniciar o projeto primeiro instale as dependências usando **npm install** e depois rode a aplicação com **node app**.

Para rodar os testes unitários utilize o comando **jest**.

---

<h2> 🔭 Objetivo da API </h2>

Responder ao endpoint
`<br>`

```
curl --request GET \
  --url http://localhost:8080/boleto/:linha_digitável
```

Com as informações sobre a linha digitável, em suas respectivas ordens (se existirem):
`<br>`

<ol>
  <li><strong>barCode:</strong> (código de barras do boleto)</li>
  <li><strong>amount:</strong> (quantia a ser paga no boleto)</li>
  <li><strong>expirationDate:</strong> (data de vencimento do boleto)</li>
</ol>

---

<h2> 🌐 Apps Usados </h2>
<ul>
  <li>Editor de Texto: Visual Studio Code</li>
  <li>Lingugem: Node.js</li>
  <li>App de Versionamento: Git and Github</li>
  <li>Testes de Api: Insomnina</li>
  <li>Pacotes De Desenvolvimento: Nodemon, Jest, SuperTest</li>
  <li>Pacotes De Produção: Express</li>
</ul>

---

<h2> 📄 Material De Apoio </h2>
<ul>
  <li>https://storage.googleapis.com/slite-api-files-production/files/b8def5e9-f732-4749-88ea-25270cb71c4d/Titulo.pdf</li>
  <li>https://storage.googleapis.com/slite-api-files-production/files/222c4ec7-9056-4149-aa42-e66b135f523a/Convenio.pdf</li>
  <li>https://www.boletobancario-codigodebarras.com/2019/04/boleto-bancario-de-cobranca.html</li>
  <li>http://www.veloso.adm.br/checkboleto/#/</li>
  <li>https://www.ttrix.com/apple/iphone/boletoscan/boletoanatomia.html</li>
</ul>

---

<h2> Considerações Finais </h2>
<ul>
  <li>Comentários em português e código em Inglês</li>
  <li>Tempo gasto: <strong>~ 5:30Hr</strong></li>
  <li>Testes unitários aplicados em Jest, vide arquivo tests.json</li>
  <li>Tratativa tanto de boletos bancários quanto boletos de concessionária</li>
</ul>
