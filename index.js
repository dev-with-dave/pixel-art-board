/**
 * Cette fonction sert à créer un bouton pour changer la couleur
 *
 * @param {{colorName: string, colorHexCode:string}} config est un objet de configuration de la fonction
 *
 * @returns HTMLButtonElement
 */

function createColorChangeButton(config) {
  // ici on crée un bouton qu'on stock dans une variable colorButtonElement
  const colorButtonElement = document.createElement('button');
  // ici on vient ajouter la class colors et une classe passée en configuration
  colorButtonElement.classList.add('colors', config.colorName);

  // ici on vient donner une apparence de cercle en agissant sur le border-radius
  colorButtonElement.style.borderRadius = '50%';

  // ici on attache un écouteur d'évènement de type click
  colorButtonElement.addEventListener('click', () => {
    // ici on vient changer la couleur active par la couleur passé en configuration
    activeColor = config.colorHexCode;
  });

  // ici on retourne notre bouton crée et configuré pour changer la couleur
  return colorButtonElement;
}

/**
 * Cette fonction sert a changer la couleur d'une cellule
 *
 * @param {MouseEvent} event
 *
 */
function colorizeCell(event) {
  event.target.style.backgroundColor = activeColor;
}

/**
 * Cette fonction sert à créer une grille
 *
 * @param {HTMLDivElement} board est l'élément dans lequel on veut ajouter la grille
 */
function drawGrid(board) {
  // ici on utilise une boucle pour créer les lignes
  for (let x = 0; x < 5; x++) {
    // je crée mon élément div qui serivra de ligne
    const line = document.createElement('div');
    // j'ajoute la classe "line" à mon élément -> voir css
    line.classList.add('line');

    // ici on utilise une boucle pour créer les cellules
    for (let y = 0; y < 5; y++) {
      // je crée mon élément div qui serivra de cellule
      const cell = document.createElement('div');
      // j'ajoute la classe "cell" à mon élément -> voir css
      cell.classList.add('cell');
      // je modifie la hauteur et la largeur de ma cellule
      cell.style.height = '50px';
      cell.style.width = '50px';
      // j'attache un évènement de type click à la cellule qui executera la fonction colorizeCell
      cell.addEventListener('click', colorizeCell);
      // ici j'ajoute ma cellule à ma ligne
      line.append(cell);
    }

    // ici j'ajoute ma ligne a mon élément passé en paramètre
    board.append(line);
  }
}

// je crée une variable activeColor qui permet de savoir quelle couleur est utilisée
let activeColor = '#000000';

// ici je crée mon élément de titre
const titleElement = document.createElement('h1');
// je change son texte
titleElement.textContent = 'Pixel Art Board';

// ici je crée mon élement qui contiendra ma grille
const board = document.createElement('div');
// je lui ajoute la class "board" -> css
board.classList.add('board');

// ici je crée mes boutons de couleur
const redButtonElement = createColorChangeButton({ colorName: 'red', colorHexCode: '#ff0000' });
const greenButtonElement = createColorChangeButton({ colorName: 'green', colorHexCode: '#00ff00' });
const blueButtonElement = createColorChangeButton({ colorName: 'blue', colorHexCode: '#0000ff' });
// ici je crée mon élément pour choisir une couleur
const colorPickerElement = document.createElement('input');
// j'utilise la méthode setAttribute pour rajouter un attribut à mon élément,
// cette méthode attend 2 arguments, le 1er est l'attribut que je veux ajouter, le 2eme est la valeur de l'attribut
colorPickerElement.setAttribute('type', 'color');
// colorPickerElement.type = 'color'; // syntaxe alternative

colorPickerElement.style.height = '50px';
colorPickerElement.style.width = '100px';
// ici j'attache un evenement de type change qui se chargera de modifier la couleur active
colorPickerElement.addEventListener('change', (event) => {
  activeColor = event.target.value;
});

// ici je viens créer un conteneur pour mes "palettes" de couleur
const colorsElement = document.createElement('div');
colorsElement.classList.add('colors__container');

// je dessine ma grille
drawGrid(board);

// enfin ici j'ajoute tout les éléments crées à ma page
document.body.append(titleElement);
document.body.append(board);

colorsElement.append(redButtonElement, greenButtonElement, blueButtonElement, colorPickerElement);
document.body.append(colorsElement);
