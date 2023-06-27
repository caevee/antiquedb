<template>
    <h2>Neuer Auftrag</h2>
    <form>
        <div class="form-group">
            <label for="autoid">Auto</label>
            <select class="form-control" v-model="autoid" required>
                <option v-for="auto in autos" :value="auto.id_auto">{{ `${auto.hersteller} ${auto.typ}` }}</option>
            </select>
        </div>
        <div class="form-group">
            <label for="kundeid">Kunde</label>
            <select class="form-control" v-model="kundeid" required>
                <option v-for="kunde in kunden" :value="kunde.id_kunde">{{ `${kunde.k_vorname} ${kunde.k_nachname}` }}</option>
            </select>
        </div>
        <div class="form-group">
            <label for="personalid">Ansprechpartner</label>
            <select class="form-control" v-model="personalid" required>
                <option v-for="angesteller in personal" :value="angesteller.id_personal">{{ `${angesteller.ma_vorname} ${angesteller.ma_nachname}` }}
                </option>
            </select>
        </div>
        <div class="form-group">
            <label for="ausleihdatum">Ausleihdatum</label>
            <input type="date" v-model="ausleihdatum" required>
        </div>
        <div class="form-group">
            <label for="rueckgabedatum">Rückgabedatum</label>
            <input type="date" v-model="rueckgabedatum" required>
        </div>
        <div class="form-group">
            <label for="anfangskm">Anfangs KM</label>
            <input type="number" min="0" v-model="anfangskm" required>
        </div>
        <div class="form-group">
            <label for="endekm">Ende KM</label>
            <input type="number" min="0" v-model="endekm" required>
        </div>
        <button type="submit" class="btn btn-primary" @click.prevent="pushData()">Submit</button>
    </form>
</template>

<script>
const BASE = "http://localhost:3000/db"
const KUNDE = "http://localhost:3000/kunde"
const PERSONAL = "http://localhost:3000/personal"
const AUTO = "http://localhost:3000/auto"
export default {
    data() {
        return {
            orders: [],
            kunden: [],
            autos: [],
            personal: [],
            autoid: null,
            kundeid: null,
            personalid: null,
            ausleihdatum: "",
            rueckgabedatum: "",
            anfangskm: null,
            endekm: null
        };
    },
    methods: {
        async pullData() {
            const orders = await fetch(BASE);
            const ordersJson = await orders.json();
            this.orders = await ordersJson;

            const kunden = await fetch(KUNDE);
            const kundenJson = await kunden.json();
            this.kunden = await kundenJson;

            const autos = await fetch(AUTO);
            const autosJson = await autos.json();
            this.autos = await autosJson;

            const personal = await fetch(PERSONAL);
            const personalJson = await personal.json();
            this.personal = await personalJson;
        },
        async pushData() {
            let data = {}
            if (this.autoid && this.kundeid && this.personalid && this.ausleihdatum && this.rueckgabedatum && this.anfangskm && this.endekm) {
                data = {
                    autoid: this.autoid,
                    kundeid: this.kundeid,
                    personalid: this.personalid,
                    ausleihdatum: this.ausleihdatum,
                    rueckgabedatum: this.rueckgabedatum,
                    anfangskm: this.anfangskm,
                    endekm: this.endekm
                }
                console.log(data);
                console.log(JSON.stringify(data));
                const response = await fetch(BASE, {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                console.log(await response);
            } else {
                console.log("empty fields");
            }
        }
    },
    beforeMount() {
        this.pullData()
    }
}
</script>