import { useState, useEffect } from "react";
import "./index.css";

function App() {
const [recipes, setRecipes] = useState(() => {
const saved = localStorage.getItem("recipes");
return saved
? JSON.parse(saved)
: [
    {
    id: 1,
    name: "Spaghetti Bolognese",
    ingredients: "Pasta, Tomato, Beef, Cheese",
    },
    {
    id: 2,
    name: "Pancakes",
    ingredients: "Flour, Milk, Eggs, Syrup",
    },
];
});

const [search, setSearch] = useState("");
const [newRecipe, setNewRecipe] = useState({ name: "", ingredients: "" });
const [editId, setEditId] = useState(null);

useEffect(() => {
localStorage.setItem("recipes", JSON.stringify(recipes));
}, [recipes]);

const handleAdd = () => {
if (!newRecipe.name.trim() || !newRecipe.ingredients.trim()) return;

if (editId) {
    setRecipes(
    recipes.map((r) =>
        r.id === editId ? { ...r, ...newRecipe } : r
    )
    );
    setEditId(null);
} else {
    setRecipes([
    ...recipes,
    {
        id: Date.now(),
        name: newRecipe.name,
        ingredients: newRecipe.ingredients,
    },
    ]);
}

setNewRecipe({ name: "", ingredients: "" });
};

const handleDelete = (id) => {
setRecipes(recipes.filter((r) => r.id !== id));
};

const handleEdit = (recipe) => {
setEditId(recipe.id);
setNewRecipe({ name: recipe.name, ingredients: recipe.ingredients });
window.scrollTo({ top: 0, behavior: "smooth" });
};