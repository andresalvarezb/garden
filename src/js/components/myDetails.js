export class Mydetails extends HTMLElement {
    myCard;
    marquee;
    details;
    static query;
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = /*html*/ `

        <style>
            details{
                margin-left: var(--layout-box-x);
                margin-right: var(--layout-box-x);
                margin-bottom: var(--layout-box-y);
            }
            .details__container{
                width: 65%;
                height: 50px;
                white-space: nowrap;
                display: flex;
                color: var(--color2);
                align-items: center;
            }
            summary {
                list-style: none;
                display: flex;
                align-items: center;
                justify-content: space-around;
                align-items: center;
                padding: 10px 15px;
                font-weight: bold;
                box-shadow: 0px 0px 10px var(--color7);
            }
            summary::after {
                content: '';
                width: 40px;
                height: 40px;
                background: url('../storage/img/arrow.svg') no-repeat;
                background-size: cover;
                transition: 0.2s;
            }
            details[open]>summary::after {
                transform: rotate(180deg);
            }
            summary::-webkit-details-marker {
                display: none;
            }
            summary {
                color: var(--color5);
                border-radius: 5px;
                background: var(--color8);
            }
            details[open] summary {
                border-radius: 10px;
            }
            details {
                /* background: red; */
                border-radius: 5px;
            }
        </style>
        <details>
            <summary>
                <div class="details__description">Campus: </div>
                <div class="details__container">
                    <p><marquee behavior="" direction="">...</marquee></p>
                </div>
            </summary>
            <div class="report__container">
                <my-card></my-card>
            </div>
        </details>
        `;

        this.myCard = this.shadowRoot.querySelector("my-card");
        this.marquee = this.shadowRoot.querySelector("marquee");
        this.details = this.shadowRoot.querySelector("details");
    }

    connectedCallback() {
        this.myCard.setAttribute("logic", Mydetails.query);
    }

    static get observedAttributes() {
        return ["logic", "text"];
    }

    attributeChangedCallback(name, old, now) {
        if (name == "logic") Mydetails.query = now;
        if (name == "text") this.marquee.textContent = now;
    }
}
