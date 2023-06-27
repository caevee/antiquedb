<template>
    <div class="container">
        <div class="row justify-content-start">
            <div v-for="order in orders" class="col" style="margin-top: 20px;">
                <div class="card" style="width: 18rem;">
                    <div class="card-header">
                        Auftrag {{ order["Interne Nummer"] }}
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Ausgeliehen am: {{ order["Ausgeliehen am"] }}</li>
                        <li class="list-group-item">Kilometerstand vorher: {{ order["Kilometerstand vorher"] }}</li>
                        <li class="list-group-item">Kilometerstand nachher: {{ order["Kilometerstand nachher"] }}</li>
                        <li class="list-group-item">PKW: {{ order["PKW Name"] }}</li>
                        <li class="list-group-item">Kilometer gefahren: {{ order["Kilometerdifferenz"] }}</li>
                        <li class="list-group-item">Tagespreis: {{ order["Preis pro Tag"] }}</li>
                        <li class="list-group-item">Kilometerpreis: {{ order["Preis pro Kilometer"] }}</li>
                        <li class="list-group-item">Preissumme: {{ order["Summe"] }}€</li>
                        <li class="list-group-item">+19% MwSt: {{ order["MwSt"] }}€</li>
                        <li class="list-group-item">Gesamtpreis: {{ order["Gesamtergebnis"] }}€</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const API = "http://localhost:3000/db"
export default {
    data() {
        return {
            orders: []
        };
    },
    methods: {
        async pullData() {
            const response = await fetch(API);
            const json = await response.json();
            this.orders = await json;
            console.log(await json);
        }
    },
    beforeMount() {
        this.pullData()
    }
}
</script>

<style>
</style>