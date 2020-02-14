
import React from "react"
import { withRouter, Route } from "react-router-dom"
import WebServices from "../components/WebServices"
import {
  IoMdTrash,
  IoMdEye,
  IoMdAdd,
  IoIosEye
} from "react-icons/io";

import Header from "../components/Header"
import Fabs, { Fab } from "../components/Fabs"
import {
  Label
} from "../components/Ui"

class All extends React.Component {
  constructor() {
    super()
    this.state = {
      farmers: [],
      loading: true,
    };
  }
  componentDidMount() {
    this.init();
  }
  init() {
    WebServices.getFarmers()
      .then(res => {
        this.setState({ farmers: res.data.data, loading: false });
      })
      .catch(err => {
        alert(err);
        this.setState({ loading: false });
      });
  }
  render() {
    if (this.state.loading) {
      return <div style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }} >loading ...</div>
    }
    return (
      <div style={{ flex: 1 }}>
        <Header back history={this.props.history} title="Farmers" />
        {this.state.farmers.length === 0 && <div style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}>No farmers found</div>}
        {this.state.farmers.length !== 0 &&
          <div>
            {this.state.farmers.map((farmer) => (
              <div style={{ alignItems: "center", padding: 5, flexDirection: "row", borderBottomWidth: 2, borderBottomColor: "lightgray", borderBottomStyle: "solid" }}>
                <div style={{ flex: 1, padding: 3 }}>
                  <div>Username: {farmer.id}</div>
                  <div>{farmer.id + " " + farmer.id}</div>
                </div>
                <IoMdTrash onClick={() => {
                  const quetion = window.confirm("Are you sure to delete this user: " + farmer.id);
                  quetion && WebServices.deleteUser(farmer.id).then(res => {
                    alert('Farmer deleted success');
                    this.init();
                  });
                }} color="red" size={32} />
                <IoIosEye onClick={() => this.props.history.push('/farmers/edit/' + farmer.id)} color="#3F51B5" style={{ marginLeft: 10 }} size={32} />
              </div>
            ))}
          </div>
        }


        <Fabs>
          <Fab Icon={IoMdAdd} onClick={() => this.props.history.push('/farmers/add')} />
        </Fabs>
      </div>
    )
  }
}


class Add extends React.Component {
  state = {
    id: 0,
    farmer_number: '124354',
    farmer_monkharit: true,
    farmer_sex: 'man',
    farmer_last_name: 'benzemame',
    farmer_first_name: 'seddik',
    farmer_birth_day: '22-06-2019',
    farmer_address: 'city abdelmoumen',
    farmer_tel: '0540055010',
    farmer_job: 'controleur gps',
    farmer_morabi_card: false,
    farmer_level_educ: 'univ',
    // mazra3a
    farm_name: 'mazraa mostakbal',
    farm_address: 'farm_address',
    farm_wilaya: '',
    farm_year_begin: '',
    farm_7ala: '',
    farm_position_people: 'far',
    farm_geran: 'me',
    farm_geran_level_edcu: 'univ',
    farm_takwin_tarbiyat_aranib: 'morabi',
    farm_takwin_tarbiyat_aranib_year: '2018',
    farm_takwin_tarbiyat_aranib_duree: '1',
    farm_number_employe: 5,
    // aranib
    arnab_solala: 'hajin',
    arnab_date_imtilak: '01-01-2019',
    arnab_imtilak_why: 'because is',
    arnab_number_mothers: 100,
    arnab_number_fathers: 50,
    arnab_mothers_prix: 40.0,
    arnab_fathers_prix: 30.0,
    arnab_amrad: 'tanafossiya',
    arnab_darwa_intaj: 50,
    arnab_date_tajdid_kati3: '13/01/2019',
    arnab_ratm_intaj: 'mokathaf',
    arnab_3omr_intaj: 5,
    arnab_naw3_talki7: 'tabi3i',
    arnab_3omr_fitam: 4,
    arnab_motawassit_intaj: 10,
    arnab_nissbat_wafayat: 'less5',
    // mo3idat tarbiya
    mo3idat_numbers_ambar: 2,
    mo3idat_missa7a_ambar: 100,
    mo3idat_gaz: 'yes',
    mo3idat_eau: 'yes',
    mo3idat_elect: 'yes',
    mo3idat_khazan_eau: 'yes',
    mo3idat_khazan_eau_si3a: 2000,
    mo3idat_madba7_wilaya: 'yes',
    mo3idat_mosta3mala_7arara_tahwiya: 'bla bla bla',
    mo3idat_akfass_total: 20,
    mo3idat_akfass_mothers: 10,
    mo3idat_akfass_fathers: 10,
    mo3idat_akfass_tassmin: 10,
    mo3idat_naw3_akfass: 'ma7ali',
    // tagdiya
    tagdiya_name_3ilaf: 'sim',
    tagdiya_3ilaf_mada_idafiya: 'yes',
    tagdiya_3ilaf_tarika_chiraa: 'massna3',
    tagdiya_3ilaf_prix: 1000.0,
    tagdiya_3ilaf_massa3ib: 'bo3d massafa',
    // ri3aya
    ri3aya_numbers_bayatira: 3,
    ri3aya_mantojat_saydalaniya: 'yes',
    ri3aya_mantojat_saydalaniya_no: 'bla bla bla',
    ri3aya_mantojat_saydalaniya_yes: 'bla bla bla',
    ri3aya_talki7: 'vhd1',
    ri3aya_talki7_prix: 12,
    ri3aya_adwiya_mosta3mala: 'bla bla bla',
    ri3aya_mo3akimat_mosta3mala: 'bla bla bla',
    ri3aya_tamtalik_i3timad_si7i: 'yes',
    // tasswik,
    tasswik_motawassit_waz_bay3_arnab: 3.5,
    tasswik_kayfiyat_bay3: 'arnab',
    tasswik_prix_arnab_kg: 35.0,
    tasswik_ayna_yatim_bay3: 'dakhel ambar',
    tasswik_morakib_si7i_dab7: 'yes',
    tasswik_barnamaj_dab7: 'monadam',
    tasswik_zabon_raissi: 'souk',
    tasswik_rotab_mostahlikin: 'bla bla bla',
    tasswik_bay3_montadam_nafss_kamiya: 'yes',
    tasswik_numbers_bay3_montadam_nafss_kamiya: 100,
    tasswik_kayfiya_takhzin: 'madbo7',
    tasswik_modat_takhzin: 'motawassita',
    tasswik_machakil: 'thakafa istihlak',
    tasswik_ishar_li_mantojk: 'yes',
    tasswik_ishar_li_mantojk_how: 'bla bla bla',
    tasswik_ishar_li_mantojk_radat_fi3l: 'la chaye',
  };
  _create() {
    WebServices.addFarmer({ ...this.state })
      .then(res => {
        alert('user created success');
      })
      .catch(err => {
        alert(err);
      });
  }
  render() {
    return (
      <div>
        <Header back history={this.props.history} title="Add farmer" />
        <div>
          <Label label="farmer_number">
            <input onChange={(e) => { this.setState({ farmer_number: e.target.value }) }} value={this.state.farmer_number} placeholder="farmer_number" />
          </Label>
          <Label label="farmer_monkharit">
            <input type="checkbox" onChange={(e) => { this.setState({ farmer_monkharit: e.target.value }) }} value={this.state.farmer_monkharit} placeholder="farmer_monkharit" />
          </Label>
          <Label label="farmer_sex">
            <select onChange={(e) => { this.setState({ farmer_sex: e.target.value }) }} value={this.state.farmer_sex} >
              <option value="man">Man</option>
              <option value="woman">Woman</option>
            </select>
          </Label>
          <Label label="farmer_last_name">
            <input onChange={(e) => { this.setState({ farmer_last_name: e.target.value }) }} value={this.state.farmer_last_name} placeholder="farmer_last_name" />
          </Label>
          <Label label="farmer_first_name">
            <input onChange={(e) => { this.setState({ farmer_first_name: e.target.value }) }} value={this.state.farmer_first_name} placeholder="farmer_first_name" />
          </Label>
          <Label label="farmer_birth_day">
            <input type="date" onChange={(e) => { this.setState({ farmer_birth_day: e.target.value }) }} value={this.state.farmer_birth_day} placeholder="farmer_birth_day" />
          </Label>
          <Label label="farmer_address">
            <input onChange={(e) => { this.setState({ farmer_address: e.target.value }) }} value={this.state.farmer_address} placeholder="farmer_address" />
          </Label>
          <Label label="farmer_tel">
            <input onChange={(e) => { this.setState({ farmer_tel: e.target.value }) }} value={this.state.farmer_tel} placeholder="farmer_tel" />
          </Label>
          <Label label="farmer_job">
            <input onChange={(e) => { this.setState({ farmer_job: e.target.value }) }} value={this.state.farmer_job} placeholder="farmer_job" />
          </Label>
          <Label label="farmer_morabi_card">
            <input type="checkbox" onChange={(e) => { this.setState({ farmer_morabi_card: e.target.value }) }} value={this.state.farmer_morabi_card} placeholder="farmer_morabi_card" />
          </Label>
          <Label label="farmer_level_educ">
            <select onChange={(e) => { this.setState({ farmer_level_educ: e.target.value }) }} value={this.state.farmer_level_educ} >
              <option value="primaire">primaire</option>
              <option value="seam">seam</option>
              <option value="laicy">laicy</option>
              <option value="mihani">mihani</option>
              <option value="univ">univ</option>
            </select>
          </Label>
          // mazra3a
          <Label label="farm_name">
            <input onChange={(e) => { this.setState({ farm_name: e.target.value }) }} value={this.state.farm_name} placeholder="farm_name" />
          </Label>
          <Label label="farm_address">
            <input onChange={(e) => { this.setState({ farm_address: e.target.value }) }} value={this.state.farm_address} placeholder="farm_address" />
          </Label>
          <Label label="farm_wilaya">
            <input onChange={(e) => { this.setState({ farm_wilaya: e.target.value }) }} value={this.state.farm_wilaya} placeholder="farm_wilaya" />
          </Label>
          <Label label="farm_year_begin">
            <input onChange={(e) => { this.setState({ farm_year_begin: e.target.value }) }} value={this.state.farm_year_begin} placeholder="farm_year_begin" />
          </Label>
          <Label label="farm_7ala">
            <input onChange={(e) => { this.setState({ farm_7ala: e.target.value }) }} value={this.state.farm_7ala} placeholder="farm_7ala" />
          </Label>
          <Label label="farm_position_people">
            <select onChange={(e) => { this.setState({ farm_position_people: e.target.value }) }} value={this.state.farm_position_people} >
              <option value="nearby">nearby</option>
              <option value="far">far</option>
            </select>
          </Label>
          <Label label="farm_geran">
            <select onChange={(e) => { this.setState({ farm_geran: e.target.value }) }} value={this.state.farm_geran} >
              <option value="me">me</option>
              <option value="other">other</option>
            </select>
          </Label>
          <Label label="farm_geran_level_edcu">
            <select onChange={(e) => { this.setState({ farm_geran_level_edcu: e.target.value }) }} value={this.state.farm_geran_level_edcu} >
              <option value="primaire">primaire</option>
              <option value="seam">seam</option>
              <option value="laicy">laicy</option>
              <option value="mihani">mihani</option>
              <option value="univ">univ</option>
            </select>
          </Label>
          <Label label="farm_takwin_tarbiyat_aranib">
            <select onChange={(e) => { this.setState({ farm_takwin_tarbiyat_aranib: e.target.value }) }} value={this.state.farm_takwin_tarbiyat_aranib} >
              <option value="morabi">morabi</option>
              <option value="ma3had">ma3had</option>
              <option value="taraboss">taraboss</option>
              <option value="self">self</option>
            </select>
          </Label>
          <Label label="farm_takwin_tarbiyat_aranib_year">
            <input type="number" onChange={(e) => { this.setState({ farm_takwin_tarbiyat_aranib_year: e.target.value }) }} value={this.state.farm_takwin_tarbiyat_aranib_year} placeholder="farm_takwin_tarbiyat_aranib_year" />
          </Label>
          <Label label="farm_takwin_tarbiyat_aranib_duree">
            <input onChange={(e) => { this.setState({ farm_takwin_tarbiyat_aranib_duree: e.target.value }) }} value={this.state.farm_takwin_tarbiyat_aranib_duree} placeholder="farm_takwin_tarbiyat_aranib_duree" />
          </Label>
          <Label label="farm_number_employe">
            <input type="number" onChange={(e) => { this.setState({ farm_number_employe: e.target.value }) }} value={this.state.farm_number_employe} placeholder="farm_number_employe" />
          </Label>
          // aranib
          <Label label="arnab_solala">
            <select onChange={(e) => { this.setState({ arnab_solala: e.target.value }) }} value={this.state.arnab_solala} >
              <option value="hajin">hajin</option>
              <option value="santitik">santitik</option>
              <option value="geant">geant</option>
              <option value="other">other</option>
            </select>
          </Label>
          <Label label="arnab_date_imtilak">
            <input onChange={(e) => { this.setState({ arnab_date_imtilak: e.target.value }) }} value={this.state.arnab_date_imtilak} placeholder="arnab_date_imtilak" />
          </Label>
          <Label label="arnab_imtilak_why">
            <input onChange={(e) => { this.setState({ arnab_imtilak_why: e.target.value }) }} value={this.state.arnab_imtilak_why} placeholder="arnab_imtilak_why" />
          </Label>

          <Label label="arnab_number_mothers">
            <input type="number" onChange={(e) => { this.setState({ arnab_number_mothers: e.target.value }) }} value={this.state.arnab_number_mothers} placeholder="arnab_number_mothers" />
          </Label>
          <Label label="arnab_number_fathers">
            <input type="number" onChange={(e) => { this.setState({ arnab_number_fathers: e.target.value }) }} value={this.state.arnab_number_fathers} placeholder="arnab_number_fathers" />
          </Label>
          <Label label="arnab_mothers_prix">
            <input type="number" onChange={(e) => { this.setState({ arnab_mothers_prix: e.target.value }) }} value={this.state.arnab_mothers_prix} placeholder="arnab_mothers_prix" />
          </Label>
          <Label label="arnab_fathers_prix">
            <input type="number" onChange={(e) => { this.setState({ arnab_fathers_prix: e.target.value }) }} value={this.state.arnab_fathers_prix} placeholder="arnab_fathers_prix" />
          </Label>
          <Label label="arnab_amrad">
            <select onChange={(e) => { this.setState({ arnab_amrad: e.target.value }) }} value={this.state.arnab_amrad} >
              <option value="tanafos">tanafos</option>
              <option value="hadmi">hadmi</option>
              <option value="virus">virus</option>
              <option value="bec">bec</option>
            </select>
          </Label>
          <Label label="arnab_darwa_intaj">
            <input type="number" onChange={(e) => { this.setState({ arnab_darwa_intaj: e.target.value }) }} value={this.state.arnab_darwa_intaj} placeholder="arnab_darwa_intaj" />
          </Label>
          <Label label="arnab_date_tajdid_kati3">
            <input type="date" onChange={(e) => { this.setState({ arnab_date_tajdid_kati3: e.target.value }) }} value={this.state.arnab_date_tajdid_kati3} placeholder="arnab_date_tajdid_kati3" />
          </Label>
          <Label label="arnab_ratm_intaj">
            <select onChange={(e) => { this.setState({ arnab_ratm_intaj: e.target.value }) }} value={this.state.arnab_ratm_intaj} >
              <option value="mokathaf">mokathaf</option>
              <option value="nisf_mokathaf">nisf_mokathaf</option>
              <option value="3achwai">3achwai</option>
            </select>
          </Label>
          <Label label="arnab_3omr_intaj">
            <input type="number" onChange={(e) => { this.setState({ arnab_3omr_intaj: e.target.value }) }} value={this.state.arnab_3omr_intaj} placeholder="arnab_3omr_intaj" />
          </Label>
          <Label label="arnab_naw3_talki7">
            <select onChange={(e) => { this.setState({ arnab_naw3_talki7: e.target.value }) }} value={this.state.arnab_naw3_talki7} >
              <option value="tabi3i">tabi3i</option>
              <option value="istina3i">istina3i</option>
            </select>
          </Label>
          <Label label="arnab_3omr_fitam">
            <input type="number" onChange={(e) => { this.setState({ arnab_3omr_fitam: e.target.value }) }} value={this.state.arnab_3omr_fitam} placeholder="arnab_3omr_fitam" />
          </Label>
          <Label label="arnab_motawassit_intaj">
            <input type="number" onChange={(e) => { this.setState({ arnab_motawassit_intaj: e.target.value }) }} value={this.state.arnab_motawassit_intaj} placeholder="arnab_motawassit_intaj" />
          </Label>
          <Label label="arnab_nissbat_wafayat">
            <select onChange={(e) => { this.setState({ arnab_nissbat_wafayat: e.target.value }) }} value={this.state.arnab_nissbat_wafayat} >
              <option value="fawk5">fawk5</option>
              <option value="istina3i">ta7t5</option>
            </select>
          </Label>
          // mo3idat tarbiya
          <Label label="mo3idat_numbers_ambar">
            <input type="number" onChange={(e) => { this.setState({ mo3idat_numbers_ambar: e.target.value }) }} value={this.state.mo3idat_numbers_ambar} placeholder="mo3idat_numbers_ambar" />
          </Label>
          <Label label="mo3idat_missa7a_ambar">
            <input type="number" onChange={(e) => { this.setState({ mo3idat_missa7a_ambar: e.target.value }) }} value={this.state.mo3idat_missa7a_ambar} placeholder="mo3idat_missa7a_ambar" />
          </Label>
          <Label label="mo3idat_gaz">
            <input type="checkbox" onChange={(e) => { this.setState({ mo3idat_gaz: e.target.value }) }} value={this.state.mo3idat_gaz} placeholder="mo3idat_gaz" />
          </Label>
          <Label label="mo3idat_eau">
            <input type="checkbox" onChange={(e) => { this.setState({ mo3idat_eau: e.target.value }) }} value={this.state.mo3idat_eau} placeholder="mo3idat_eau" />
          </Label>
          <Label label="mo3idat_elect">
            <input type="checkbox" onChange={(e) => { this.setState({ mo3idat_elect: e.target.value }) }} value={this.state.mo3idat_elect} placeholder="mo3idat_elect" />
          </Label>
          <Label label="mo3idat_khazan_eau">
            <input type="checkbox" onChange={(e) => { this.setState({ mo3idat_khazan_eau: e.target.value }) }} value={this.state.mo3idat_khazan_eau} placeholder="mo3idat_khazan_eau" />
          </Label>
          <Label label="mo3idat_khazan_eau_si3a">
            <input type="number" onChange={(e) => { this.setState({ mo3idat_khazan_eau_si3a: e.target.value }) }} value={this.state.mo3idat_khazan_eau_si3a} placeholder="mo3idat_khazan_eau_si3a" />
          </Label>
          <Label label="mo3idat_madba7_wilaya">
            <input type="checkbox" onChange={(e) => { this.setState({ mo3idat_madba7_wilaya: e.target.value }) }} value={this.state.mo3idat_madba7_wilaya} placeholder="mo3idat_madba7_wilaya" />
          </Label>
          <Label label="mo3idat_mosta3mala_7arara_tahwiya">
            <input onChange={(e) => { this.setState({ mo3idat_mosta3mala_7arara_tahwiya: e.target.value }) }} value={this.state.mo3idat_mosta3mala_7arara_tahwiya} placeholder="mo3idat_mosta3mala_7arara_tahwiya" />
          </Label>

          <Label label="mo3idat_akfass_total">
            <input type="number" onChange={(e) => { this.setState({ mo3idat_akfass_total: e.target.value }) }} value={this.state.mo3idat_akfass_total} placeholder="mo3idat_akfass_total" />
          </Label>
          <Label label="mo3idat_akfass_mothers">
            <input type="number" onChange={(e) => { this.setState({ mo3idat_akfass_mothers: e.target.value }) }} value={this.state.mo3idat_akfass_mothers} placeholder="mo3idat_akfass_mothers" />
          </Label>
          <Label label="mo3idat_akfass_fathers">
            <input type="number" onChange={(e) => { this.setState({ mo3idat_akfass_fathers: e.target.value }) }} value={this.state.mo3idat_akfass_fathers} placeholder="mo3idat_akfass_fathers" />
          </Label>
          <Label label="mo3idat_akfass_tassmin">
            <input type="number" onChange={(e) => { this.setState({ mo3idat_akfass_tassmin: e.target.value }) }} value={this.state.mo3idat_akfass_tassmin} placeholder="mo3idat_akfass_tassmin" />
          </Label>
          <Label label="mo3idat_naw3_akfass">
            <select onChange={(e) => { this.setState({ mo3idat_naw3_akfass: e.target.value }) }} value={this.state.mo3idat_naw3_akfass} >
              <option value="mostawrad">mostawrad</option>
              <option value="ma7ali">ma7ali</option>
            </select>
          </Label>
          // tagdiya
          <Label label="tagdiya_name_3ilaf">
            <select onChange={(e) => { this.setState({ tagdiya_name_3ilaf: e.target.value }) }} value={this.state.tagdiya_name_3ilaf} >
              <option value="sim">sim</option>
              <option value="kharboch">kharboch</option>
              <option value="wachfon">wachfon</option>
              <option value="other">other</option>
            </select>
          </Label>
          <Label label="tagdiya_3ilaf_mada_idafiya">
            <input type="checkbox" onChange={(e) => { this.setState({ tagdiya_3ilaf_mada_idafiya: e.target.value }) }} value={this.state.tagdiya_3ilaf_mada_idafiya} placeholder="tagdiya_3ilaf_mada_idafiya" />
          </Label>
          <Label label="tagdiya_3ilaf_tarika_chiraa">
            <select onChange={(e) => { this.setState({ tagdiya_3ilaf_tarika_chiraa: e.target.value }) }} value={this.state.tagdiya_3ilaf_tarika_chiraa} >
              <option value="derect">derect</option>
              <option value="mowazi3_a">mowazi3_a</option>
              <option value="mowazi3_b">mowazi3_b</option>
            </select>
          </Label>
          <Label label="tagdiya_3ilaf_prix">
            <input type="number" onChange={(e) => { this.setState({ tagdiya_3ilaf_prix: e.target.value }) }} value={this.state.tagdiya_3ilaf_prix} placeholder="tagdiya_3ilaf_prix" />
          </Label>
          <Label label="tagdiya_3ilaf_massa3ib">
            <input onChange={(e) => { this.setState({ tagdiya_3ilaf_massa3ib: e.target.value }) }} value={this.state.tagdiya_3ilaf_massa3ib} placeholder="tagdiya_3ilaf_massa3ib" />
          </Label>
          // ri3aya
          <Label label="ri3aya_numbers_bayatira">
            <input type="number" onChange={(e) => { this.setState({ ri3aya_numbers_bayatira: e.target.value }) }} value={this.state.ri3aya_numbers_bayatira} placeholder="ri3aya_numbers_bayatira" />
          </Label>
          <Label label="ri3aya_mantojat_saydalaniya">
            <input type="checkbox" onChange={(e) => { this.setState({ ri3aya_mantojat_saydalaniya: e.target.value }) }} value={this.state.ri3aya_mantojat_saydalaniya} placeholder="ri3aya_mantojat_saydalaniya" />
          </Label>
          <Label label="ri3aya_mantojat_saydalaniya_no">
            <input onChange={(e) => { this.setState({ ri3aya_mantojat_saydalaniya_no: e.target.value }) }} value={this.state.ri3aya_mantojat_saydalaniya_no} placeholder="ri3aya_mantojat_saydalaniya_no" />
          </Label>
          <Label label="ri3aya_mantojat_saydalaniya_yes">
            <input onChange={(e) => { this.setState({ ri3aya_mantojat_saydalaniya_yes: e.target.value }) }} value={this.state.ri3aya_mantojat_saydalaniya_yes} placeholder="ri3aya_mantojat_saydalaniya_yes" />
          </Label>
          <Label label="ri3aya_talki7">
            <select onChange={(e) => { this.setState({ ri3aya_talki7: e.target.value }) }} value={this.state.ri3aya_talki7} >
              <option value="koklafaks">koklafaks</option>
              <option value="parfak">parfak</option>
              <option value="vhd1">vhd1</option>
              <option value="vhd2">vhd2</option>
            </select>
          </Label>
          <Label label="ri3aya_talki7_prix">
            <input type="number" onChange={(e) => { this.setState({ ri3aya_talki7_prix: e.target.value }) }} value={this.state.ri3aya_talki7_prix} placeholder="ri3aya_talki7_prix" />
          </Label>
          <Label label="ri3aya_adwiya_mosta3mala">
            <input onChange={(e) => { this.setState({ ri3aya_adwiya_mosta3mala: e.target.value }) }} value={this.state.ri3aya_adwiya_mosta3mala} placeholder="ri3aya_adwiya_mosta3mala" />
          </Label>
          <Label label="ri3aya_mo3akimat_mosta3mala">
            <input onChange={(e) => { this.setState({ ri3aya_mo3akimat_mosta3mala: e.target.value }) }} value={this.state.ri3aya_mo3akimat_mosta3mala} placeholder="ri3aya_mo3akimat_mosta3mala" />
          </Label>
          <Label label="ri3aya_tamtalik_i3timad_si7i">
            <input type="checkbox" onChange={(e) => { this.setState({ ri3aya_tamtalik_i3timad_si7i: e.target.value }) }} value={this.state.ri3aya_tamtalik_i3timad_si7i} placeholder="tagdiya_3ilaf_mada_idafiya" />
          </Label>
          // tasswik
          <Label label="tasswik_motawassit_wazn_bay3_arnab">
            <input type="number" onChange={(e) => { this.setState({ tasswik_motawassit_wazn_bay3_arnab: e.target.value }) }} value={this.state.tasswik_motawassit_wazn_bay3_arnab} placeholder="tasswik_motawassit_wazn_bay3_arnab" />
          </Label>
          <Label label="tasswik_kayfiyat_bay3">
            <select onChange={(e) => { this.setState({ tasswik_kayfiyat_bay3: e.target.value }) }} value={this.state.tasswik_kayfiyat_bay3} >
              <option value="arnab">arnab</option>
              <option value="mizan">mizan</option>
            </select>
          </Label>
          <Label label="tasswik_prix_arnab_kg">
            <input type="number" onChange={(e) => { this.setState({ tasswik_prix_arnab_kg: e.target.value }) }} value={this.state.tasswik_prix_arnab_kg} placeholder="tasswik_prix_arnab_kg" />
          </Label>
          <Label label="tasswik_morakib_si7i_dab7">
            <input type="checkbox" onChange={(e) => { this.setState({ tasswik_morakib_si7i_dab7: e.target.value }) }} value={this.state.tasswik_morakib_si7i_dab7} placeholder="tagdiya_3ilaf_mada_idafiya" />
          </Label>
          <Label label="tasswik_barnamaj_dab7">
            <select onChange={(e) => { this.setState({ tasswik_barnamaj_dab7: e.target.value }) }} value={this.state.tasswik_barnamaj_dab7} >
              <option value="monadam">monadam</option>
              <option value="gayr_monadam">gayr_monadam</option>
            </select>
          </Label>
          <Label label="tasswik_zabon_raissi">
            <select onChange={(e) => { this.setState({ tasswik_zabon_raissi: e.target.value }) }} value={this.state.tasswik_zabon_raissi} >
              <option value="wassit">wassit</option>
              <option value="mata3im">mata3im</option>
              <option value="souk">souk</option>
              <option value="mostahlik_daim">mostahlik_daim</option>
            </select>
          </Label>
          <Label label="tasswik_rotab_mostahlikin">
            <input onChange={(e) => { this.setState({ tasswik_rotab_mostahlikin: e.target.value }) }} value={this.state.tasswik_rotab_mostahlikin} placeholder="tasswik_rotab_mostahlikin" />
          </Label>
          <Label label="tasswik_bay3_montadam_nafss_kamiya">
            <input type="checkbox" onChange={(e) => { this.setState({ tasswik_bay3_montadam_nafss_kamiya: e.target.value }) }} value={this.state.tasswik_bay3_montadam_nafss_kamiya} placeholder="tagdiya_3ilaf_mada_idafiya" />
          </Label>
          <Label label="tasswik_numbers_bay3_montadam_nafss_kamiya">
            <input type="number" onChange={(e) => { this.setState({ tasswik_numbers_bay3_montadam_nafss_kamiya: e.target.value }) }} value={this.state.tasswik_numbers_bay3_montadam_nafss_kamiya} placeholder="tasswik_numbers_bay3_montadam_nafss_kamiya" />
          </Label>
          <Label label="tasswik_kayfiya_takhzin">
            <select onChange={(e) => { this.setState({ tasswik_kayfiya_takhzin: e.target.value }) }} value={this.state.tasswik_kayfiya_takhzin} >
              <option value="madbo7">madbo7</option>
              <option value="7ay">7ay</option>
            </select>
          </Label>
          <Label label="tasswik_modat_takhzin">
            <select onChange={(e) => { this.setState({ tasswik_modat_takhzin: e.target.value }) }} value={this.state.tasswik_modat_takhzin} >
              <option value="motawassita">motawassita</option>
              <option value="9assira">9assira</option>
              <option value="tawila">tawila</option>
            </select>
          </Label>
          <Label label="tasswik_machakil">
            <select onChange={(e) => { this.setState({ tasswik_machakil: e.target.value }) }} value={this.state.tasswik_machakil} >
              <option value="motadabdib">motadabdib</option>
              <option value="takhzin">takhzin</option>
              <option value="thakafa_istihlak">thakafa_istihlak</option>
              <option value="nakl">nakl</option>
              <option value="takhar_daf3">takhar_daf3</option>
              <option value="dab7">dab7</option>
            </select>
          </Label>
          <Label label="tasswik_ishar_li_mantojk">
            <input type="checkbox" onChange={(e) => { this.setState({ tasswik_ishar_li_mantojk: e.target.value }) }} value={this.state.tasswik_ishar_li_mantojk} placeholder="tasswik_ishar_li_mantojk" />
          </Label>
          <Label label="tasswik_ishar_li_mantojk_how">
            <input onChange={(e) => { this.setState({ tasswik_ishar_li_mantojk_how: e.target.value }) }} value={this.state.tasswik_ishar_li_mantojk_how} placeholder="tasswik_ishar_li_mantojk_how" />
          </Label>
          <Label label="tasswik_ishar_li_mantojk_radat_fi3l">
            <select onChange={(e) => { this.setState({ tasswik_ishar_li_mantojk_radat_fi3l: e.target.value }) }} value={this.state.tasswik_ishar_li_mantojk_radat_fi3l} >
              <option value="lamobalat">lamobalat</option>
              <option value="ihtimam">ihtimam</option>
              <option value="lachaya">lachaya</option>
            </select>
          </Label>
          <button onClick={() => this._create()} >Create</button>
        </div>
      </div>
    )
  }
}


class Edit extends React.Component {
  constructor() {
    super()
    this.state = {
      id: 0,
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      tel: '',
      role: 'user',
      img1: '123456789',
      img2: '123456789',
      img3: '123456789',
      loading: true,
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    WebServices.getUser(id)
      .then(res => {
        const data = res.data.data;
        this.setState({ ...data, loading: false });
      })
      .catch(err => {
        alert(err);
        this.setState({ loading: false });
      });
  }
  _update() {
    const {
      id,
      username,
      password,
      firstname,
      lastname,
      tel,
      role,
      img1,
      img2,
      img3,
    } = this.state;
    WebServices.editUser(
      id,
      username,
      password,
      firstname,
      lastname,
      tel,
      role,
      img1,
      img2,
      img3
    )
      .then(res => {
        console.log('then in handle submit' + res);
        alert('user updated success');
      })
      .catch(err => {
        alert(err);
      });
  }
  render() {
    if (this.state.loading) {
      return <div style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }} >loading ...</div>
    }
    return (
      <div>
        <Header back history={this.props.history} title="Edit user" />
        <div>
          <input onChange={(e) => { this.setState({ username: e.target.value }) }} value={this.state.username} placeholder="username" />
          <input onChange={(e) => { this.setState({ password: e.target.value }) }} value={this.state.password} type="password" placeholder="password" />
          <input onChange={(e) => { this.setState({ firstname: e.target.value }) }} value={this.state.firstname} placeholder="firstname" />
          <input onChange={(e) => { this.setState({ lastname: e.target.value }) }} value={this.state.lastname} placeholder="lastname" />
          <input onChange={(e) => { this.setState({ tel: e.target.value }) }} value={this.state.tel} placeholder="tel" />
          <select onChange={(e) => { this.setState({ role: e.target.value }) }} value={this.state.role} >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <input placeholder="fffh" type="file" />
          <input type="file" />
          <input type="file" />
          <button onClick={() => this._update()} >Update</button>
        </div>
      </div>
    )
  }
}

class Users extends React.Component {
  render() {
    return (
      <div style={{ flex: 1 }}>
        <Route exact path="/farmers" component={All} />
        <Route path="/farmers/add" component={Add} />
        <Route path="/farmers/edit/:id" component={Edit} />
      </div>
    )
  }
}

export default Users