import React, { Component } from "react";
import translate from "../i18n/translate";

export default class DietsComponent extends Component {

  render() {
    return (
      <div>
        <div>
          <br></br>
          <h3>{translate("titleTable1")}</h3>
          <br></br>
          <ul><li><strong>{translate("ulStrongTable1")}&nbsp;</strong>{translate("ulTable1")}<span></span></li></ul>
          <figure className="wp-block-table">
            <table className="has-fixed-layout">
              <thead>
                <tr>
                  <th className="has-text-align-center" data-align="center"><p>{translate("menu")}</p></th>
                  <th className="has-text-align-center" data-align="center"><p>{translate("food")}</p></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="has-text-align-center" data-align="center">{translate("breakfast")}</td>
                  <td className="has-text-align-center" data-align="center">{translate("breakfastItem1.1")} <a href="https://gymbeam.bg/bio-5-grain-flakes-vanavita.html" target="_blank" aria-label=" (opens in a new tab)" rel="noreferrer noopener" className="ek-link">{translate("breakfastItemHref1.1")}</a> {translate("breakfastItem1.2")} <a href="https://gymbeam.bg/bio-vegan-protein-vanavita.html" target="_blank" aria-label=" (opens in a new tab)" rel="noreferrer noopener" className="ek-link">{translate("breakfastItemHref1.2")}</a> {translate("breakfastItem1.3")} <a href="https://gymbeam.bg/fetceno-maslo-gymbeam.html" target="_blank" aria-label=" (opens in a new tab)" rel="noreferrer noopener" className="ek-link">{translate("breakfastItemHref1.3")}</a> {translate("breakfastItem1.4")}<a href="https://gymbeam.bg/bezkaloricen-sirop-chocolate-syrup-320-ml-gymbeam.html" className="ek-link"> {translate("breakfastItemHref1.4")} </a>{translate("breakfastItem1.5")}</td>
                </tr>
                <tr>
                  <td className="has-text-align-center" data-align="center">{translate("snacking")}</td>
                  <td className="has-text-align-center" data-align="center">{translate("snackingItem1.1")} <a href="https://gymbeam.bg/crispy-muesli-mix-gymbeam.html" target="_blank" aria-label=" (opens in a new tab)" rel="noreferrer noopener" className="ek-link">{translate("snackingItemHref1.1")}</a> {translate("snackingItem1.1.2")}</td>
                </tr>
                <tr>
                  <td className="has-text-align-center" data-align="center">{translate("lunch")}</td>
                  <td className="has-text-align-center" data-align="center">{translate("lunchItem1")}</td>
                </tr>
                <tr>
                  <td className="has-text-align-center" data-align="center">{translate("snacking")}</td>
                  <td className="has-text-align-center" data-align="center">{translate("snackingItem1.2")}</td>
                </tr>
                <tr>
                  <td className="has-text-align-center" data-align="center">{translate("dinner")}</td>
                  <td className="has-text-align-center" data-align="center">{translate("dinnerItem")}</td>
                </tr>
              </tbody>
            </table>
          </figure>
        </div>


        <div style={{ margin: "0 0 60px 0" }}>
          <br></br>
          <h3>{translate("titleTable2")}</h3>
          <br></br>
          <ul><li><strong>{translate("ulStrongTable2")}&nbsp;</strong>{translate("ulTable2")}<span></span></li></ul>
          <figure className="wp-block-table">
            <table className="has-fixed-layout">
              <thead>
                <tr>
                  <th className="has-text-align-center" data-align="center"><p>{translate("menu")}</p></th>
                  <th className="has-text-align-center" data-align="center"><p>{translate("food")}</p></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="has-text-align-center" data-align="center">{translate("breakfast")}</td>
                  <td className="has-text-align-center" data-align="center">{translate("breakfastItem2.1")}<a href="https://gymbeam.bg/techni-qichni-beltuci-gymbeam.html" target="_blank" aria-label=" (opens in a new tab)" rel="noreferrer noopener" className="ek-link">{translate("breakfastItemHref2.1")}</a>) {translate("breakfastItem2.2")} <a href="https://gymbeam.bg/maslo-ghi-gymbeam.html" target="_blank" aria-label=" (opens in a new tab)" rel="noreferrer noopener" className="ek-link">{translate("breakfastItemHref2.2")}</a> {translate("breakfastItem2.3")}</td>
                </tr>
                <tr>

                  <td className="has-text-align-center" data-align="center">{translate("snacking")}</td>
                  <td className="has-text-align-center" data-align="center">{translate("snackingItem2.1")} <a href="https://gymbeam.bg/moimuv-protein-milkshake-gymbeam.html" target="_blank" aria-label=" (opens in a new tab)" rel="noreferrer noopener" className="ek-link">{translate("snackingItemHref2.1")}</a>{translate("snackingItem2.2")}</td>
                </tr>
                <tr>
                  <td className="has-text-align-center" data-align="center">{translate("lunch")}</td>
                  <td className="has-text-align-center" data-align="center">{translate("lunchItem2")}</td>
                </tr>
                <tr>
                  <td className="has-text-align-center" data-align="center">{translate("snacking")}</td>
                  <td className="has-text-align-center" data-align="center"><a href="https://gymbeam.bg/orizova-kasha-gymbeam.html" target="_blank" aria-label=" (opens in a new tab)" rel="noreferrer noopener" className="ek-link">{translate("snackingItemHref2.2")}</a> {translate("snackingItem2.2.2")}</td>
                </tr>
                <tr>
                  <td className="has-text-align-center" data-align="center">{translate("dinner")}</td>
                  <td className="has-text-align-center" data-align="center">{translate("dinnerItem2.1")}<a href="https://gymbeam.bg/sardini-v-zehtin-gymbeam.html" target="_blank" aria-label=" (opens in a new tab)" rel="noreferrer noopener" className="ek-link">{translate("dinnerItemHref2.1")}&nbsp;</a>{translate("dinnerItem2.2")}</td>
                </tr>
              </tbody>
            </table>
          </figure>
        </div>



      </div>
    );
  }
}
