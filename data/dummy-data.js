import recipeCategory from '../models/recipeCategory';
import Recipe from '../models/recipe';
import Item from '../models/item';

const ITEMS = [
  new Item(
    'p1',
    'u1',
    'Broccoli',
    'https://www.cookforyourlife.org/wp-content/uploads/2018/08/shutterstock_294838064-min.jpg',
    "Can be used for...).",
    29.99,
    true
  ),
  new Item(
    'p2',
    'u1',
    'Mushroom',
    'https://www.dw.com/image/45631828_401.jpg',
    "Can be used for...).",
    99.99,
    true
  ),
  new Item(
    'p3',
    'u2',
    'Chick Peas',
    'https://media.healthyfood.com/wp-content/uploads/2017/03/Ask-Niki-Lentils-and-chickpeas.jpg',
    'Can also be used for tea!',
    8.99,
    true
  ),
  new Item(
    'p4',
    'u3',
    'Batata',
    'data:image/jpeg;base64,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',
    "Can be used for...).",
    15.99,
    true
  ),
  new Item(
    'p5',
    'u3',
    'Baba Ganoush',
    'https://hurrythefoodup.com/wp-content/uploads/2017/06/Baba-Ganoush-5.jpg',
    "Can be used for...).",
    2299.99,
    true
  ),
  new Item(
    'p6',
    'u1',
    'Parsley',
    'https://travelingwithpurpose.com/wp-content/uploads/2020/03/parsley-800.jpg',
    "Can be used for...).",
    5.49,
    true
  )
];

export default ITEMS;

export const CATEGORIES = [
  new recipeCategory('c1', 'Italian', '#f5428d'),
  new recipeCategory('c2', 'Quick & Easy', '#f54242'),
  new recipeCategory('c3', 'Hamburgers', '#f5a442'),
  new recipeCategory('c4', 'German', '#f5d142'),
  new recipeCategory('c5', 'Light & Lovely', '#368dff'),
  new recipeCategory('c6', 'Exotic', '#41d95d'),
  new recipeCategory('c7', 'Breakfast', '#9eecff'),
  new recipeCategory('c8', 'Asian', '#b9ffb0'),
  new recipeCategory('c9', 'French', '#ffc7ff'),
  new recipeCategory('c10', 'Summer', '#47fced')
];

 export const RECIPES = [
    new Recipe(
      'm1',
      ['c1', 'c2'],
      'Spaghetti with Tomato Sauce',
      'affordable',
      'simple',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg/800px-Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg',
      20,
      [
        '4 Tomatoes',
        '1 Tablespoon of Olive Oil',
        '1 Onion',
        '250g Spaghetti',
        'Spices',
        'Cheese (optional)'
      ],
      [
        'Cut the tomatoes and the onion into small pieces.',
        'Boil some water - add salt to it once it boils.',
        'Put the spaghetti into the boiling water - they should be done in about 10 to 12 minutes.',
        'In the meantime, heaten up some olive oil and add the cut onion.',
        'After 2 minutes, add the tomato pieces, salt, pepper and your other spices.',
        'The sauce will be done once the spaghetti are.',
        'Feel free to add some cheese on top of the finished dish.'
      ],
      false,
      true,
      true,
      true
    ),
  
    new Recipe(
      'm2',
      ['c2'],
      'Toast Hawaii',
      'affordable',
      'simple',
      'https://cdn.pixabay.com/photo/2018/07/11/21/51/toast-3532016_1280.jpg',
      10,
      [
        '1 Slice White Bread',
        '1 Slice Ham',
        '1 Slice Pineapple',
        '1-2 Slices of Cheese',
        'Butter'
      ],
      [
        'Butter one side of the white bread',
        'Layer ham, the pineapple and cheese on the white bread',
        'Bake the toast for round about 10 minutes in the oven at 200Â°C'
      ],
      false,
      false,
      false,
      false
    ),
  
    new Recipe(
      'm3',
      ['c3'],
      'Classic Hamburger',
      'pricey',
      'simple',
      'https://cdn.pixabay.com/photo/2014/10/23/18/05/burger-500054_1280.jpg',
      45,
      [
        '300g Cattle Hack',
        '1 Tomato',
        '1 Cucumber',
        '1 Onion',
        'Ketchup',
        '2 Burger Buns'
      ],
      [
        'Form 2 patties',
        'Fry the patties for c. 4 minutes on each side',
        'Quickly fry the buns for c. 1 minute on each side',
        'Bruch buns with ketchup',
        'Serve burger with tomato, cucumber and onion'
      ],
      false,
      false,
      false,
      true
    ),
  
    new Recipe(
      'm4',
      ['c4'],
      'Wiener Schnitzel',
      'luxurious',
      'challenging',
      'https://cdn.pixabay.com/photo/2018/03/31/19/29/schnitzel-3279045_1280.jpg',
      60,
      [
        '8 Veal Cutlets',
        '4 Eggs',
        '200g Bread Crumbs',
        '100g Flour',
        '300ml Butter',
        '100g Vegetable Oil',
        'Salt',
        'Lemon Slices'
      ],
      [
        'Tenderize the veal to about 2â€“4mm, and salt on both sides.',
        'On a flat plate, stir the eggs briefly with a fork.',
        'Lightly coat the cutlets in flour then dip into the egg, and finally, coat in breadcrumbs.',
        'Heat the butter and oil in a large pan (allow the fat to get very hot) and fry the schnitzels until golden brown on both sides.',
        'Make sure to toss the pan regularly so that the schnitzels are surrounded by oil and the crumbing becomes â€˜fluffyâ€™.',
        'Remove, and drain on kitchen paper. Fry the parsley in the remaining oil and drain.',
        'Place the schnitzels on awarmed plate and serve garnishedwith parsley and slices of lemon.'
      ],
      false,
      false,
      false,
      false
    ),
  
    new Recipe(
      'm5',
      ['c2', 'c5', 'c10'],
      'Salad with Smoked Salmon',
      'luxurious',
      'simple',
      'https://cdn.pixabay.com/photo/2016/10/25/13/29/smoked-salmon-salad-1768890_1280.jpg',
      15,
      [
        'Arugula',
        "Lamb's Lettuce",
        'Parsley',
        'Fennel',
        '200g Smoked Salmon',
        'Mustard',
        'Balsamic Vinegar',
        'Olive Oil',
        'Salt and Pepper'
      ],
      [
        'Wash and cut salad and herbs',
        'Dice the salmon',
        'Process mustard, vinegar and olive oil into a dessing',
        'Prepare the salad',
        'Add salmon cubes and dressing'
      ],
      true,
      false,
      true,
      true
    ),
  
    new Recipe(
      'm6',
      ['c6', 'c10'],
      'Delicious Orange Mousse',
      'affordable',
      'hard',
      'https://cdn.pixabay.com/photo/2017/05/01/05/18/pastry-2274750_1280.jpg',
      240,
      [
        '4 Sheets of Gelatine',
        '150ml Orange Juice',
        '80g Sugar',
        '300g Yoghurt',
        '200g Cream',
        'Orange Peel'
      ],
      [
        'Dissolve gelatine in pot',
        'Add orange juice and sugar',
        'Take pot off the stove',
        'Add 2 tablespoons of yoghurt',
        'Stir gelatin under remaining yoghurt',
        'Cool everything down in the refrigerator',
        'Whip the cream and lift it under die orange mass',
        'Cool down again for at least 4 hours',
        'Serve with orange peel'
      ],
      true,
      false,
      true,
      false
    ),
  
    new Recipe(
      'm7',
      ['c7'],
      'Pancakes',
      'affordable',
      'simple',
      'https://cdn.pixabay.com/photo/2018/07/10/21/23/pancake-3529653_1280.jpg',
      20,
      [
        '1 1/2 Cups all-purpose Flour',
        '3 1/2 Teaspoons Baking Powder',
        '1 Teaspoon Salt',
        '1 Tablespoon White Sugar',
        '1 1/4 cups Milk',
        '1 Egg',
        '3 Tablespoons Butter, melted'
      ],
      [
        'In a large bowl, sift together the flour, baking powder, salt and sugar.',
        'Make a well in the center and pour in the milk, egg and melted butter; mix until smooth.',
        'Heat a lightly oiled griddle or frying pan over medium high heat.',
        'Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each pancake. Brown on both sides and serve hot.'
      ],
      true,
      false,
      true,
      false
    ),
  
    new Recipe(
      'm8',
      ['c8'],
      'Creamy Indian Chicken Curry',
      'pricey',
      'challenging',
      'https://cdn.pixabay.com/photo/2018/06/18/16/05/indian-food-3482749_1280.jpg',
      35,
      [
        '4 Chicken Breasts',
        '1 Onion',
        '2 Cloves of Garlic',
        '1 Piece of Ginger',
        '4 Tablespoons Almonds',
        '1 Teaspoon Cayenne Pepper',
        '500ml Coconut Milk'
      ],
      [
        'Slice and fry the chicken breast',
        'Process onion, garlic and ginger into paste and sautÃ© everything',
        'Add spices and stir fry',
        'Add chicken breast + 250ml of water and cook everything for 10 minutes',
        'Add coconut milk',
        'Serve with rice'
      ],
      true,
      false,
      false,
      true
    ),
  
    new Recipe(
      'm9',
      ['c9'],
      'Chocolate Souffle',
      'affordable',
      'hard',
      'https://cdn.pixabay.com/photo/2014/08/07/21/07/souffle-412785_1280.jpg',
      45,
      [
        '1 Teaspoon melted Butter',
        '2 Tablespoons white Sugar',
        '2 Ounces 70% dark Chocolate, broken into pieces',
        '1 Tablespoon Butter',
        '1 Tablespoon all-purpose Flour',
        '4 1/3 tablespoons cold Milk',
        '1 Pinch Salt',
        '1 Pinch Cayenne Pepper',
        '1 Large Egg Yolk',
        '2 Large Egg Whites',
        '1 Pinch Cream of Tartar',
        '1 Tablespoon white Sugar'
      ],
      [
        'Preheat oven to 190Â°C. Line a rimmed baking sheet with parchment paper.',
        'Brush bottom and sides of 2 ramekins lightly with 1 teaspoon melted butter; cover bottom and sides right up to the rim.',
        'Add 1 tablespoon white sugar to ramekins. Rotate ramekins until sugar coats all surfaces.',
        'Place chocolate pieces in a metal mixing bowl.',
        'Place bowl over a pan of about 3 cups hot water over low heat.',
        'Melt 1 tablespoon butter in a skillet over medium heat. Sprinkle in flour. Whisk until flour is incorporated into butter and mixture thickens.',
        'Whisk in cold milk until mixture becomes smooth and thickens. Transfer mixture to bowl with melted chocolate.',
        'Add salt and cayenne pepper. Mix together thoroughly. Add egg yolk and mix to combine.',
        'Leave bowl above the hot (not simmering) water to keep chocolate warm while you whip the egg whites.',
        'Place 2 egg whites in a mixing bowl; add cream of tartar. Whisk until mixture begins to thicken and a drizzle from the whisk stays on the surface about 1 second before disappearing into the mix.',
        'Add 1/3 of sugar and whisk in. Whisk in a bit more sugar about 15 seconds.',
        'whisk in the rest of the sugar. Continue whisking until mixture is about as thick as shaving cream and holds soft peaks, 3 to 5 minutes.',
        'Transfer a little less than half of egg whites to chocolate.',
        'Mix until egg whites are thoroughly incorporated into the chocolate.',
        'Add the rest of the egg whites; gently fold into the chocolate with a spatula, lifting from the bottom and folding over.',
        'Stop mixing after the egg white disappears. Divide mixture between 2 prepared ramekins. Place ramekins on prepared baking sheet.',
        'Bake in preheated oven until scuffles are puffed and have risen above the top of the rims, 12 to 15 minutes.'
      ],
      true,
      false,
      true,
      false
    ),
    new Recipe(
      'm10',
      ['c2', 'c5', 'c10'],
      'Asparagus Salad with Cherry Tomatoes',
      'luxurious',
      'simple',
      'https://cdn.pixabay.com/photo/2018/04/09/18/26/asparagus-3304997_1280.jpg',
      30,
      [
        'White and Green Asparagus',
        '30g Pine Nuts',
        '300g Cherry Tomatoes',
        'Salad',
        'Salt, Pepper and Olive Oil'
      ],
      [
        'Wash, peel and cut the asparagus',
        'Cook in salted water',
        'Salt and pepper the asparagus',
        'Roast the pine nuts',
        'Halve the tomatoes',
        'Mix with asparagus, salad and dressing',
        'Serve with Baguette'
      ],
      true,
      true,
      true,
      true
    )
  ];