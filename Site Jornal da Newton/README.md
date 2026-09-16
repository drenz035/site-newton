# Jornal da Escola — Newton Ferreira de Paiva

Site oficial do Jornal da Escola: um portal editorial feito **por estudantes e para estudantes**.
HTML5 semântico + CSS moderno + JavaScript vanilla, **sem frameworks e sem build**.

---

## 📁 Estrutura de arquivos (pronta para hospedagem)

```
Site Jornal da Newton/
├── index.html                 ← página inicial (ponto de entrada do site)
├── css/
│   └── style.css              ← identidade visual, layout e responsividade
├── js/
│   └── script.js              ← menu, filtros, animações e ano do rodapé
├── fotos/
│   ├── logo.png               ← logo oficial (usada no header)
│   ├── favicon-16.png         ← ícone pequeno da aba do navegador
│   ├── favicon-32.png         ← ícone da aba do navegador
│   └── apple-touch-icon.png   ← ícone ao salvar o site na tela inicial (iOS)
├── robots.txt                 ← orientação para os buscadores
├── .nojekyll                  ← garante a publicação correta no GitHub Pages
└── README.md                  ← este guia
```

Os caminhos são **relativos** (`css/style.css`, `js/script.js`, `fotos/logo.png`), então o site
funciona igual abrindo o arquivo no computador ou publicado na internet.

---

## 💻 Como abrir no seu computador

Dê **duplo clique em `index.html`**. Pronto — não precisa instalar nada.

Para simular um servidor real (opcional): no VS Code, instale a extensão **Live Server**,
clique com o botão direito em `index.html` e escolha *Open with Live Server*.

---

## 🚀 Como publicar (escolha uma opção)

### Opção 1 — GitHub Pages (gratuito, recomendado)
1. Crie um repositório no GitHub e envie estes arquivos para a branch `main`
   (a pasta do projeto deve ser a **raiz** do repositório, com o `index.html` na frente).
2. No repositório, vá em **Settings → Pages**.
3. Em *Build and deployment*, escolha **Deploy from a branch**.
4. Selecione a branch `main` e a pasta **/ (root)**. Salve.
5. Em 1–2 minutos o site estará no ar em `https://SEU-USUARIO.github.io/NOME-DO-REPO/`.

> O arquivo `.nojekyll` já está incluído: ele impede o Jekyll de mexer nos arquivos do site.

### Opção 2 — Netlify (mais rápido, sem instalar nada)
1. Acesse <https://app.netlify.com/drop>.
2. **Arraste a pasta inteira** do projeto para a área indicada.
3. O site fica no ar na hora, com um endereço temporário que pode ser renomeado.

### Opção 3 — Vercel
1. Acesse <https://vercel.com>, clique em **Add New → Project** e importe o repositório do GitHub.
2. Em *Framework Preset* escolha **Other** e deixe *Build Command* e *Output Directory* vazios.
3. Clique em **Deploy**.

### Opção 4 — Cloudflare Pages
1. Acesse <https://pages.cloudflare.com> e conecte o repositório.
2. Deixe o comando de build vazio e o diretório de saída como **/** (raiz).
3. Clique em **Save and Deploy**.

---

## ✅ Depois de publicar (checklist rápido)

- [ ] **`og:image`:** no `<head>` do `index.html`, troque `fotos/logo.png` pela URL completa
      (`https://seu-dominio.com/fotos/logo.png`). Sem isso, o link não mostra imagem ao ser
      compartilhado no WhatsApp/Instagram.
- [ ] **`robots.txt`:** descomente a linha do `Sitemap` quando existir um sitemap.
- [ ] Abra o site no celular e confira o **menu hambúrguer** e os **cards em uma coluna**.
- [ ] (Opcional) Registre um domínio próprio nas configurações do serviço escolhido.

---

## 📰 Como publicar uma notícia

1. Abra o `index.html` e localize o comentário **`COMO PUBLICAR UMA NOTICIA REAL`**
   (dentro da seção *Últimas notícias*).
2. Copie o modelo `<article>` que está ali e cole ao lado dos outros cards.
3. Ajuste título, resumo, texto completo e data. Na imagem, aponte para o arquivo real:
   ```html
   <img src="fotos/nome-da-foto.jpg" alt="Descrição objetiva da foto"
        width="1200" height="800" loading="lazy" decoding="async">
   ```
   Coloque os arquivos de foto dentro da pasta `fotos/`.
4. Em `data-news-category`, use uma das categorias existentes:
   `eventos`, `dicas` ou `curiosidades`.
5. **Criar uma editoria nova** (Entrevistas, Esportes, Cultura, Opinião...):
   adicione um botão na lista `.filters` e use o **mesmo valor** em `data-news-category`
   dos artigos. Os links do menu superior reaproveitam o mesmo filtro automaticamente.
6. As categorias do cabeçalho (Início, Notícias, Eventos / Dicas, Curiosidades, Sobre nós)
   podem ser renomeadas ou trocadas no bloco `<nav class="main-nav">`.

> Os cards atuais são **prévias demonstrativas** (ilustrações + "Leitura de exemplo").
> Substitua-os conforme as notícias reais forem surgindo.

---

## 🎨 Identidade visual

Para mudar a identidade inteira do site, altere apenas as variáveis no topo do `css/style.css`:

| Variável | Valor atual | Uso |
|---|---|---|
| `--blue` | `#1b0d8c` | Cor predominante |
| `--blue-deep` | `#14096a` | Profundidade (rodapé, fundos) |
| `--yellow` | `#ffd21c` | Destaques, selos, hovers |
| `--white` | `#ffffff` | Textos e cards |
| `--paper` | `#faf9f5` | Fundo "papel" |
| `--dark` | `#1c1b23` | Texto principal |
| `--muted` | `#67656f` | Texto secundário |
| `--container` | `1240px` | Largura máxima do conteúdo |

Tipografia: **Manrope** (títulos) e **DM Sans** (textos), carregadas via Google Fonts.

---

## ♿ Acessibilidade e desempenho

- HTML semântico (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, `time`).
- Contraste de texto conforme WCAG AA; `alt` em todas as imagens; `aria-label` nos controles.
- Foco visível no teclado, atalho *Pular para o conteúdo* e menu que fecha com **Esc**.
- Respeita `prefers-reduced-motion` (quem desativa animações no sistema não vê movimento).
- Sem bibliotecas externas: apenas HTML, CSS e JS puros. Ícones e ilustrações são SVG inline.
