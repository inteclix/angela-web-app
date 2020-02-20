import React from "react";
import { withRouter, Route } from "react-router-dom";
import WebServices from "../components/WebServices";
import { IoMdTrash, IoMdEye, IoMdAdd, IoIosEye } from "react-icons/io";

import Header from "../components/Header";
import Fabs, { Fab } from "../components/Fabs";
import { Label } from "../components/Ui";

class All extends React.Component {
  constructor() {
    super();
    this.state = {
      farmers: [],
      loading: true
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
      return (
        <div
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          loading ...
        </div>
      );
    }
    return (
      <div style={{ flex: 1 }}>
        <Header back history={this.props.history} title="الكل" />
        {this.state.farmers.length === 0 && (
          <div
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            No farmers found
          </div>
        )}
        {this.state.farmers.length !== 0 && (
          <div>
            {this.state.farmers.map((farmer, index) => (
              <div
                key={index}
                style={{
                  alignItems: "center",
                  padding: 5,
                  flexDirection: "row",
                  borderBottomWidth: 2,
                  borderBottomColor: "lightgray",
                  borderBottomStyle: "solid"
                }}
              >
                <div style={{ flex: 1, padding: 3 }}>
                  <div>إسم المزرعة : {farmer.farm_name}</div>
                  <div>إنشاء من طرف : {farmer.user.username}</div>
                  <div>تاريخ الإنشاء : {farmer.created_at}</div>
                </div>
                <IoMdTrash
                  onClick={() => {
                    const quetion = window.confirm(
                      "Are you sure to delete this user: " + farmer.id
                    );
                    quetion &&
                      WebServices.deleteFarmer(farmer.id).then(res => {
                        alert("Farmer deleted success");
                        this.init();
                      });
                  }}
                  color="red"
                  size={32}
                />
                <IoIosEye
                  onClick={() =>
                    this.props.history.push("/farmers/edit/" + farmer.id)
                  }
                  color="#3F51B5"
                  style={{ marginLeft: 10 }}
                  size={32}
                />
              </div>
            ))}
          </div>
        )}

        <Fabs>
          <Fab
            Icon={IoMdAdd}
            onClick={() => this.props.history.push("/farmers/add")}
          />
        </Fabs>
      </div>
    );
  }
}

class Add extends React.Component {
  componentDidMount() {
    WebServices.getProfile().then(res => {
      this.setState({ user_id: res.data.data.id });
    });
  }
  state = {
    id: 0,
    user_id: 0,
    farmer_number: "",
    farmer_monkharit: false,
    farmer_monkharit_prix: 0,
    farmer_sex: "man",
    farmer_last_name: "",
    farmer_first_name: "",
    farmer_birth_day: "",
    farmer_address: "",
    farmer_tel: "",
    farmer_job: "",
    farmer_morabi_card: false,
    farmer_level_educ: "univ",
    // mazra3a
    farm_name: "",
    farm_address: "",
    farm_wilaya: "",
    farm_year_begin: "",
    farm_7ala: "",
    farm_position_people: "far",
    farm_geran: "me",
    farm_geran_level_edcu: "univ",
    farm_takwin_tarbiyat_aranib: "morabi",
    farm_takwin_tarbiyat_aranib_year: "",
    farm_takwin_tarbiyat_aranib_duree: 1,
    farm_number_employe: 5,
    // aranib
    arnab_solala: "hajin",
    arnab_date_imtilak: "",
    arnab_imtilak_why: "",
    arnab_number_mothers: 0,
    arnab_number_fathers: 0,
    arnab_mothers_prix: 0.0,
    arnab_fathers_prix: 0.0,
    arnab_amrad: "tanafos",
    arnab_darwa_intaj: 0,
    arnab_date_tajdid_kati3: "",
    arnab_ratm_intaj: "mokathaf",
    arnab_3omr_intaj: 0,
    arnab_naw3_talki7: "tabi3i",
    arnab_3omr_fitam: 0,
    arnab_motawassit_intaj: 0,
    arnab_nissbat_wafayat: "fawk5",
    // mo3idat tarbiya
    mo3idat_numbers_ambar: 0,
    mo3idat_missa7a_ambar: 0,
    mo3idat_gaz: true,
    mo3idat_eau: true,
    mo3idat_elect: true,
    mo3idat_khazan_eau: true,
    mo3idat_khazan_eau_si3a: 0,
    mo3idat_madba7_wilaya: true,
    mo3idat_mosta3mala_7arara_tahwiya: "",
    mo3idat_akfass_total: 0,
    mo3idat_akfass_mothers: 0,
    mo3idat_akfass_fathers: 0,
    mo3idat_akfass_tassmin: 0,
    mo3idat_naw3_akfass: "ma7ali",
    // tagdiya
    tagdiya_name_3ilaf: "sim",
    tagdiya_3ilaf_mada_idafiya: true,
    tagdiya_3ilaf_tarika_chiraa: "derect",
    tagdiya_3ilaf_prix: 0.0,
    tagdiya_3ilaf_massa3ib: "bo3d_massafa",
    // ri3aya
    ri3aya_numbers_bayatira: 0,
    ri3aya_mantojat_saydalaniya: true,
    ri3aya_mantojat_saydalaniya_no: "",
    ri3aya_mantojat_saydalaniya_yes: "",
    ri3aya_talki7: "",
    ri3aya_talki7_prix: 0,
    ri3aya_adwiya_mosta3mala: "",
    ri3aya_mo3akimat_mosta3mala: "",
    ri3aya_tamtalik_i3timad_si7i: true,
    // tasswik,
    tasswik_motawassit_wazn_bay3_arnab: 0,
    tasswik_kayfiyat_bay3: "arnab",
    tasswik_prix_arnab_kg: 0.0,
    tasswik_ayna_yatim_bay3: "dakhil_ambar",
    tasswik_morakib_si7i_dab7: true,
    tasswik_barnamaj_dab7: "monadam",
    tasswik_zabon_raissi: "wassit",
    tasswik_rotab_mostahlikin: "",
    tasswik_bay3_montadam_nafss_kamiya: true,
    tasswik_numbers_bay3_montadam_nafss_kamiya: 0,
    tasswik_kayfiya_takhzin: "madbo7",
    tasswik_modat_takhzin: "motawassita",
    tasswik_machakil: "motadabdib",
    tasswik_ishar_li_mantojk: true,
    tasswik_ishar_li_mantojk_how: "",
    tasswik_ishar_li_mantojk_radat_fi3l: "lamobalat"
  };
  _create() {
    WebServices.addFarmer({ ...this.state })
      .then(res => {
        alert("user created success");
        this.props.history.replace("/farmers");
      })
      .catch(err => {
        alert(err);
      });
  }
  render() {
    return (
      <div>
        <Header back history={this.props.history} title="إضافة جديدة" />
        <h2 style={{ textAlign: "right", color: "#3F51B5" }}>
          معلومات عن المربي
        </h2>
        <div>
          <Label label="الترقيم">
            <input
              onChange={e => {
                this.setState({ farmer_number: e.target.value });
              }}
              value={this.state.farmer_number}
              placeholder="farmer_number"
            />
          </Label>
          <Label label="هل أنت منخرط">
            <input
              type="checkbox"
              onChange={e => {
                this.setState({
                  farmer_monkharit: e.target.checked
                });
              }}
              checked={this.state.farmer_monkharit}
              placeholder="farmer_monkharit"
            />
          </Label>
          <Label label="ثمن الإنخراط">
            <input
              onChange={e => {
                this.setState({ farmer_monkharit_prix: e.target.value });
              }}
              value={this.state.farmer_monkharit_prix}
              placeholder=""
              type="number"
            />
          </Label>
          <Label label="الجنس">
            <select
              onChange={e => {
                this.setState({ farmer_sex: e.target.value });
              }}
              value={this.state.farmer_sex}
            >
              <option value="man">ذكر</option>
              <option value="woman">أنثى</option>
            </select>
          </Label>
          <Label label="الإسم">
            <input
              onChange={e => {
                this.setState({ farmer_last_name: e.target.value });
              }}
              value={this.state.farmer_last_name}
              placeholder="farmer_last_name"
            />
          </Label>
          <Label label="اللقب">
            <input
              onChange={e => {
                this.setState({ farmer_first_name: e.target.value });
              }}
              value={this.state.farmer_first_name}
              placeholder="farmer_first_name"
            />
          </Label>
          <Label label="تاريخ الميلاد">
            <input
              type="date"
              onChange={e => {
                this.setState({ farmer_birth_day: e.target.value });
              }}
              value={this.state.farmer_birth_day}
              placeholder="farmer_birth_day"
            />
          </Label>
          <Label label="العنوان">
            <input
              onChange={e => {
                this.setState({ farmer_address: e.target.value });
              }}
              value={this.state.farmer_address}
              placeholder="farmer_address"
            />
          </Label>
          <Label label="رقم الهاتف">
            <input
              onChange={e => {
                this.setState({ farmer_tel: e.target.value });
              }}
              value={this.state.farmer_tel}
              placeholder="farmer_tel"
            />
          </Label>
          <Label label="المهنة">
            <input
              onChange={e => {
                this.setState({ farmer_job: e.target.value });
              }}
              value={this.state.farmer_job}
              placeholder="farmer_job"
            />
          </Label>
          <Label label="هل لديك بطاقة مربي">
            <input
              type="checkbox"
              onChange={e => {
                this.setState({ farmer_morabi_card: e.target.checked });
              }}
              checked={this.state.farmer_morabi_card}
              placeholder="farmer_morabi_card"
            />
          </Label>
          <Label label="المستوى الدراسي">
            <select
              onChange={e => {
                this.setState({ farmer_level_educ: e.target.value });
              }}
              value={this.state.farmer_level_educ}
            >
              <option value="primaire">إبتدائي</option>
              <option value="seam">متوسط</option>
              <option value="laicy">ثانوي</option>
              <option value="mihani">تكوين مهني</option>
              <option value="univ">جامعي</option>
            </select>
          </Label>
          <h2 style={{ textAlign: "right", color: "#3F51B5" }}>
            معلومات عن المزرعة
          </h2>
          <Label label="الإسم">
            <input
              onChange={e => {
                this.setState({ farm_name: e.target.value });
              }}
              value={this.state.farm_name}
              placeholder="farm_name"
            />
          </Label>
          <Label label="العنوان">
            <input
              onChange={e => {
                this.setState({ farm_address: e.target.value });
              }}
              value={this.state.farm_address}
              placeholder="farm_address"
            />
          </Label>
          <Label label="الرقم الولائي">
            <input
              onChange={e => {
                this.setState({ farm_wilaya: e.target.value });
              }}
              value={this.state.farm_wilaya}
              placeholder="farm_wilaya"
            />
          </Label>
          <Label label="سنة الإفتتاح">
            <input
              onChange={e => {
                this.setState({ farm_year_begin: e.target.value });
              }}
              value={this.state.farm_year_begin}
              placeholder="farm_year_begin"
            />
          </Label>
          <Label label="الحالة">
            <select
              onChange={e => {
                this.setState({ farm_7ala: e.target.value });
              }}
              value={this.state.farm_7ala}
            >
              <option value="milkia">ملكية</option>
              <option value="kiraa">كراء</option>
              <option value="other">شيء آخر</option>
            </select>
          </Label>
          <Label label="موقع المزرعة بالنسبة للسكان">
            <select
              onChange={e => {
                this.setState({ farm_position_people: e.target.value });
              }}
              value={this.state.farm_position_people}
            >
              <option value="nearby">قريب</option>
              <option value="far">بعيد</option>
            </select>
          </Label>
          <Label label="المسير">
            <select
              onChange={e => {
                this.setState({ farm_geran: e.target.value });
              }}
              value={this.state.farm_geran}
            >
              <option value="me">أنا</option>
              <option value="other">آخر</option>
            </select>
          </Label>
          <Label label="المستوى الدراسي للمسير">
            <select
              onChange={e => {
                this.setState({ farm_geran_level_edcu: e.target.value });
              }}
              value={this.state.farm_geran_level_edcu}
            >
              <option value="primaire">إبتدائي</option>
              <option value="seam">متوسط</option>
              <option value="laicy">ثانوي</option>
              <option value="mihani">تكوين مهني</option>
              <option value="univ">جامعي</option>
            </select>
          </Label>
          <Label label="أين تلقيت تكوينك">
            <select
              onChange={e => {
                this.setState({ farm_takwin_tarbiyat_aranib: e.target.value });
              }}
              value={this.state.farm_takwin_tarbiyat_aranib}
            >
              <option value="morabi">مربي</option>
              <option value="ma3had">معهد</option>
              <option value="taraboss">تربص</option>
              <option value="self">ذاتي</option>
            </select>
          </Label>
          <Label label="سنة التكوين">
            <input
              type="date"
              onChange={e => {
                this.setState({
                  farm_takwin_tarbiyat_aranib_year: e.target.value
                });
              }}
              value={this.state.farm_takwin_tarbiyat_aranib_year}
              placeholder="farm_takwin_tarbiyat_aranib_year"
            />
          </Label>
          <Label label="مدة التكوين">
            <input
              onChange={e => {
                this.setState({
                  farm_takwin_tarbiyat_aranib_duree: e.target.value
                });
              }}
              value={this.state.farm_takwin_tarbiyat_aranib_duree}
              placeholder="farm_takwin_tarbiyat_aranib_duree"
            />
          </Label>
          <Label label="عدد العمال">
            <input
              type="number"
              onChange={e => {
                this.setState({ farm_number_employe: e.target.value });
              }}
              value={this.state.farm_number_employe}
              placeholder="farm_number_employe"
            />
          </Label>
          <h2 style={{ textAlign: "right", color: "#3F51B5" }}>
            معلومات عن الأرنب
          </h2>
          <Label label="السلالة">
            <select
              onChange={e => {
                this.setState({ arnab_solala: e.target.value });
              }}
              value={this.state.arnab_solala}
            >
              <option value="hajin">هجين</option>
              <option value="santitik">سانتيتيك</option>
              <option value="geant">عملاق</option>
              <option value="other">آخر</option>
            </select>
          </Label>
          <Label label="منذ متى تمتلكها">
            <input
              onChange={e => {
                this.setState({ arnab_date_imtilak: e.target.value });
              }}
              value={this.state.arnab_date_imtilak}
              placeholder="arnab_date_imtilak"
            />
          </Label>
          <Label label="لماذا اخترت هاته السلالة">
            <input
              onChange={e => {
                this.setState({ arnab_imtilak_why: e.target.value });
              }}
              value={this.state.arnab_imtilak_why}
              placeholder="arnab_imtilak_why"
            />
          </Label>
          <Label label="عدد الأمهات">
            <input
              type="number"
              onChange={e => {
                this.setState({ arnab_number_mothers: e.target.value });
              }}
              value={this.state.arnab_number_mothers}
              placeholder="arnab_number_mothers"
            />
          </Label>
          <Label label="عدد الذكور">
            <input
              type="number"
              onChange={e => {
                this.setState({ arnab_number_fathers: e.target.value });
              }}
              value={this.state.arnab_number_fathers}
              placeholder="arnab_number_fathers"
            />
          </Label>
          <Label label="ثمن شراء الإناث">
            <input
              type="number"
              onChange={e => {
                this.setState({ arnab_mothers_prix: e.target.value });
              }}
              value={this.state.arnab_mothers_prix}
              placeholder="arnab_mothers_prix"
            />
          </Label>
          <Label label="ثمن شراء الذكور">
            <input
              type="number"
              onChange={e => {
                this.setState({ arnab_fathers_prix: e.target.value });
              }}
              value={this.state.arnab_fathers_prix}
              placeholder="arnab_fathers_prix"
            />
          </Label>
          <Label label="لأمراض التي يعاني منها القطيع">
            <input
              type="text"
              onChange={e => {
                this.setState({ arnab_amrad: e.target.value });
              }}
              value={this.state.arnab_amrad}
              placeholder="بكتيريا فيروسية تنفسية هضمية "
            />
          </Label>
          <Label label="ذروة الإنتاج">
            <input
              type="text"
              onChange={e => {
                this.setState({ arnab_darwa_intaj: e.target.value });
              }}
              value={this.state.arnab_darwa_intaj}
              placeholder="arnab_darwa_intaj"
            />
          </Label>
          <Label label="وقت تجديد القطيع">
            <input
              type="text"
              onChange={e => {
                this.setState({ arnab_date_tajdid_kati3: e.target.value });
              }}
              value={this.state.arnab_date_tajdid_kati3}
              placeholder="شهور التجديد"
            />
          </Label>
          <Label label="رتم الإنتاج">
            <select
              onChange={e => {
                this.setState({ arnab_ratm_intaj: e.target.value });
              }}
              value={this.state.arnab_ratm_intaj}
            >
              <option value="mokathaf">مكثف</option>
              <option value="nisf_mokathaf">نصف مكثف</option>
              <option value="3achwai">عشوائي</option>
            </select>
          </Label>
          <Label label="عمر الإنتاج لقطيع الإحلال">
            <input
              type="number"
              onChange={e => {
                this.setState({ arnab_3omr_intaj: e.target.value });
              }}
              value={this.state.arnab_3omr_intaj}
              placeholder="arnab_3omr_intaj"
            />
          </Label>
          <Label label="نوع التلقيح">
            <select
              onChange={e => {
                this.setState({ arnab_naw3_talki7: e.target.value });
              }}
              value={this.state.arnab_naw3_talki7}
            >
              <option value="tabi3i">طبيعي</option>
              <option value="istina3i">اصطناعي</option>
            </select>
          </Label>
          <Label label="عمر الفطام">
            <input
              type="number"
              onChange={e => {
                this.setState({ arnab_3omr_fitam: e.target.value });
              }}
              value={this.state.arnab_3omr_fitam}
              placeholder="arnab_3omr_fitam"
            />
          </Label>
          <Label label="متوسط الإنتاج">
            <input
              type="number"
              onChange={e => {
                this.setState({ arnab_motawassit_intaj: e.target.value });
              }}
              value={this.state.arnab_motawassit_intaj}
              placeholder="arnab_motawassit_intaj"
            />
          </Label>
          <Label label="نسبة الوفيات">
            <select
              onChange={e => {
                this.setState({ arnab_nissbat_wafayat: e.target.value });
              }}
              value={this.state.arnab_nissbat_wafayat}
            >
              <option value="fawk5">فوق %5</option>
              <option value="istina3i">تحت %5</option>
            </select>
          </Label>
          <h2 style={{ textAlign: "right", color: "#3F51B5" }}>
            معدات التربية
          </h2>
          <Label label="عدد العنابر">
            <input
              type="number"
              onChange={e => {
                this.setState({ mo3idat_numbers_ambar: e.target.value });
              }}
              value={this.state.mo3idat_numbers_ambar}
              placeholder="mo3idat_numbers_ambar"
            />
          </Label>
          <Label label="مساحة العمبر">
            <input
              type="number"
              onChange={e => {
                this.setState({ mo3idat_missa7a_ambar: e.target.value });
              }}
              value={this.state.mo3idat_missa7a_ambar}
              placeholder="mo3idat_missa7a_ambar"
            />
          </Label>
          <Label label="الغاز موجود؟">
            <input
              type="checkbox"
              onChange={e => {
                this.setState({ mo3idat_gaz: e.target.checked });
              }}
              checked={this.state.mo3idat_gaz}
              placeholder="mo3idat_gaz"
            />
          </Label>
          <Label label="الماء موجود؟">
            <input
              type="checkbox"
              onChange={e => {
                this.setState({ mo3idat_eau: e.target.checked });
              }}
              checked={this.state.mo3idat_eau}
              placeholder="mo3idat_eau"
            />
          </Label>
          <Label label="الكهرباء موجود؟">
            <input
              type="checkbox"
              onChange={e => {
                this.setState({ mo3idat_elect: e.target.checked });
              }}
              checked={this.state.mo3idat_elect}
              placeholder="mo3idat_elect"
            />
          </Label>
          <Label label="هل لديك خزان الماء">
            <input
              type="checkbox"
              onChange={e => {
                this.setState({ mo3idat_khazan_eau: e.target.checked });
              }}
              checked={this.state.mo3idat_khazan_eau}
              placeholder="mo3idat_khazan_eau"
            />
          </Label>
          <Label label="سعة الخزان">
            <input
              type="number"
              onChange={e => {
                this.setState({ mo3idat_khazan_eau_si3a: e.target.value });
              }}
              value={this.state.mo3idat_khazan_eau_si3a}
              placeholder="mo3idat_khazan_eau_si3a"
            />
          </Label>
          <Label label="هل يوجد مذبح في ولايتك">
            <input
              type="checkbox"
              onChange={e => {
                this.setState({ mo3idat_madba7_wilaya: e.target.checked });
              }}
              checked={this.state.mo3idat_madba7_wilaya}
              placeholder="mo3idat_madba7_wilaya"
            />
          </Label>
          <Label label="المعدات المستعملة في التحكم بدرجة الحرارة والتهوية">
            <input
              onChange={e => {
                this.setState({
                  mo3idat_mosta3mala_7arara_tahwiya: e.target.value
                });
              }}
              value={this.state.mo3idat_mosta3mala_7arara_tahwiya}
              placeholder="mo3idat_mosta3mala_7arara_tahwiya"
            />
          </Label>
          <Label label="عدد الأقفاص الإجمالي">
            <input
              type="number"
              onChange={e => {
                this.setState({ mo3idat_akfass_total: e.target.value });
              }}
              value={this.state.mo3idat_akfass_total}
              placeholder="mo3idat_akfass_total"
            />
          </Label>
          <Label label="عدد أقفاص الإناث">
            <input
              type="number"
              onChange={e => {
                this.setState({ mo3idat_akfass_mothers: e.target.value });
              }}
              value={this.state.mo3idat_akfass_mothers}
              placeholder="mo3idat_akfass_mothers"
            />
          </Label>
          <Label label="عدد أقفاص الذكور">
            <input
              type="number"
              onChange={e => {
                this.setState({ mo3idat_akfass_fathers: e.target.value });
              }}
              value={this.state.mo3idat_akfass_fathers}
              placeholder="mo3idat_akfass_fathers"
            />
          </Label>
          <Label label="عدد أقفاص التسمين">
            <input
              type="number"
              onChange={e => {
                this.setState({ mo3idat_akfass_tassmin: e.target.value });
              }}
              value={this.state.mo3idat_akfass_tassmin}
              placeholder="mo3idat_akfass_tassmin"
            />
          </Label>
          <Label label="نوع الأقفاص">
            <select
              onChange={e => {
                this.setState({ mo3idat_naw3_akfass: e.target.value });
              }}
              value={this.state.mo3idat_naw3_akfass}
            >
              <option value="mostawrad">مستورد</option>
              <option value="ma7ali">محلي</option>
            </select>
          </Label>
          <h2 style={{ textAlign: "right", color: "#3F51B5" }}>التغذية</h2>
          <Label label="إسم المصنع للعلف">
            <select
              onChange={e => {
                this.setState({ tagdiya_name_3ilaf: e.target.value });
              }}
              value={this.state.tagdiya_name_3ilaf}
            >
              <option value="sim">سيم</option>
              <option value="kharboch">خربوش</option>
              <option value="wachfon">وشفون</option>
              <option value="other">غير ذلك</option>
            </select>
          </Label>
          <Label label="هل تستعمل إضافة أخرى">
            <input
              type="checkbox"
              onChange={e => {
                this.setState({ tagdiya_3ilaf_mada_idafiya: e.target.checked });
              }}
              checked={this.state.tagdiya_3ilaf_mada_idafiya}
              placeholder="tagdiya_3ilaf_mada_idafiya"
            />
          </Label>
          <Label label="طريقة الشراء">
            <select
              onChange={e => {
                this.setState({ tagdiya_3ilaf_tarika_chiraa: e.target.value });
              }}
              value={this.state.tagdiya_3ilaf_tarika_chiraa}
            >
              <option value="derect">مباشرة من المصنع</option>
              <option value="mowazi3_a">موزع أ</option>
              <option value="mowazi3_b">موزع ب</option>
            </select>
          </Label>
          <Label label="ثمن العلف للقنطار">
            <input
              type="number"
              onChange={e => {
                this.setState({ tagdiya_3ilaf_prix: e.target.value });
              }}
              value={this.state.tagdiya_3ilaf_prix}
              placeholder="tagdiya_3ilaf_prix"
            />
          </Label>
          <Label label="مصاعب شراء العلف">
            <input
              onChange={e => {
                this.setState({ tagdiya_3ilaf_massa3ib: e.target.value });
              }}
              value={this.state.tagdiya_3ilaf_massa3ib}
              placeholder="ما هي المصاعب؟"
            />
          </Label>
          <h2 style={{ textAlign: "right", color: "#3F51B5" }}>الرعاية</h2>
          <Label label="عدد البياطرة">
            <input
              type="number"
              onChange={e => {
                this.setState({ ri3aya_numbers_bayatira: e.target.value });
              }}
              value={this.state.ri3aya_numbers_bayatira}
              placeholder="ri3aya_numbers_bayatira"
            />
          </Label>
          <Label label="هل تستعمل المنتوجات الصيدلانية">
            <input
              type="checkbox"
              onChange={e => {
                this.setState({
                  ri3aya_mantojat_saydalaniya: e.target.checked
                });
              }}
              checked={this.state.ri3aya_mantojat_saydalaniya}
              placeholder="ri3aya_mantojat_saydalaniya"
            />
          </Label>
          <Label label="إذا كانت الإجابة ب لا">
            <input
              onChange={e => {
                this.setState({
                  ri3aya_mantojat_saydalaniya_no: e.target.value
                });
              }}
              value={this.state.ri3aya_mantojat_saydalaniya_no}
              placeholder="ri3aya_mantojat_saydalaniya_no"
            />
          </Label>
          <Label label="إذا كانت الإجابة ب نعم">
            <input
              onChange={e => {
                this.setState({
                  ri3aya_mantojat_saydalaniya_yes: e.target.value
                });
              }}
              value={this.state.ri3aya_mantojat_saydalaniya_yes}
              placeholder="ri3aya_mantojat_saydalaniya_yes"
            />
          </Label>
          <Label label="التلقيح">
            <input
              type="text"
              onChange={e => {
                this.setState({ ri3aya_talki7: e.target.value });
              }}
              value={this.state.ri3aya_talki7}
              placeholder="كوكلافاكس بارفاك vhd1 vhd2"
            />
          </Label>
          <Label label="ثمن التلقيح">
            <input
              type="number"
              onChange={e => {
                this.setState({ ri3aya_talki7_prix: e.target.value });
              }}
              value={this.state.ri3aya_talki7_prix}
              placeholder="ri3aya_talki7_prix"
            />
          </Label>
          <Label label="الأدوية المستعملة">
            <input
              onChange={e => {
                this.setState({ ri3aya_adwiya_mosta3mala: e.target.value });
              }}
              value={this.state.ri3aya_adwiya_mosta3mala}
              placeholder="ri3aya_adwiya_mosta3mala"
            />
          </Label>
          <Label label="المعقمات المستعملة">
            <input
              onChange={e => {
                this.setState({ ri3aya_mo3akimat_mosta3mala: e.target.value });
              }}
              value={this.state.ri3aya_mo3akimat_mosta3mala}
              placeholder="ri3aya_mo3akimat_mosta3mala"
            />
          </Label>
          <Label label="هل تمتلك إعتماد صحي">
            <input
              type="checkbox"
              onChange={e => {
                this.setState({
                  ri3aya_tamtalik_i3timad_si7i: e.target.checked
                });
              }}
              checked={this.state.ri3aya_tamtalik_i3timad_si7i}
              placeholder="tagdiya_3ilaf_mada_idafiya"
            />
          </Label>
          <h2 style={{ textAlign: "right", color: "#3F51B5" }}>التسويق</h2>
          <Label label="متوسط وزن الأرنب عند البيع">
            <input
              type="number"
              onChange={e => {
                this.setState({
                  tasswik_motawassit_wazn_bay3_arnab: e.target.value
                });
              }}
              value={this.state.tasswik_motawassit_wazn_bay3_arnab}
              placeholder="tasswik_motawassit_wazn_bay3_arnab"
            />
          </Label>
          <Label label="كيفية البيع">
            <select
              onChange={e => {
                this.setState({ tasswik_kayfiyat_bay3: e.target.value });
              }}
              value={this.state.tasswik_kayfiyat_bay3}
            >
              <option value="arnab">بالأرنب</option>
              <option value="mizan">الميزان</option>
            </select>
          </Label>
          <Label label="الثمن">
            <input
              type="number"
              onChange={e => {
                this.setState({ tasswik_prix_arnab_kg: e.target.value });
              }}
              value={this.state.tasswik_prix_arnab_kg}
              placeholder="tasswik_prix_arnab_kg"
            />
          </Label>
          <Label label="هل يوجد مراقب صحي عند الذبح">
            <input
              type="checkbox"
              onChange={e => {
                this.setState({ tasswik_morakib_si7i_dab7: e.target.checked });
              }}
              checked={this.state.tasswik_morakib_si7i_dab7}
              placeholder="tagdiya_3ilaf_mada_idafiya"
            />
          </Label>
          <Label label="برنامج الذبح">
            <select
              onChange={e => {
                this.setState({ tasswik_barnamaj_dab7: e.target.value });
              }}
              value={this.state.tasswik_barnamaj_dab7}
            >
              <option value="monadam">منظم</option>
              <option value="gayr_monadam">غير منظم</option>
            </select>
          </Label>
          <Label label="الزبون الرئيسي">
            <select
              onChange={e => {
                this.setState({ tasswik_zabon_raissi: e.target.value });
              }}
              value={this.state.tasswik_zabon_raissi}
            >
              <option value="wassit">الوسيط</option>
              <option value="mata3im">مطاعم</option>
              <option value="souk">السوق</option>
              <option value="mostahlik_daim">مستهلك دائم</option>
            </select>
          </Label>
          <Label label="رتب المستهلكين">
            <input
              onChange={e => {
                this.setState({ tasswik_rotab_mostahlikin: e.target.value });
              }}
              value={this.state.tasswik_rotab_mostahlikin}
              placeholder="tasswik_rotab_mostahlikin"
            />
          </Label>
          <Label label="بيع منظم بنفس الكمية">
            <input
              type="checkbox"
              onChange={e => {
                this.setState({
                  tasswik_bay3_montadam_nafss_kamiya: e.target.checked
                });
              }}
              checked={this.state.tasswik_bay3_montadam_nafss_kamiya}
              placeholder="tagdiya_3ilaf_mada_idafiya"
            />
          </Label>
          <Label label="كمية البيع">
            <input
              type="number"
              onChange={e => {
                this.setState({
                  tasswik_numbers_bay3_montadam_nafss_kamiya: e.target.value
                });
              }}
              value={this.state.tasswik_numbers_bay3_montadam_nafss_kamiya}
              placeholder="tasswik_numbers_bay3_montadam_nafss_kamiya"
            />
          </Label>
          <Label label="كيفية التخزين">
            <select
              onChange={e => {
                this.setState({ tasswik_kayfiya_takhzin: e.target.value });
              }}
              value={this.state.tasswik_kayfiya_takhzin}
            >
              <option value="madbo7">مذبوح</option>
              <option value="7ay">حي</option>
            </select>
          </Label>
          <Label label="مدة التخزين">
            <select
              onChange={e => {
                this.setState({ tasswik_modat_takhzin: e.target.value });
              }}
              value={this.state.tasswik_modat_takhzin}
            >
              <option value="motawassita">متوسطة</option>
              <option value="9assira">قصيرة</option>
              <option value="tawila">طويلة</option>
            </select>
          </Label>
          <Label label="مشاكل التسويق">
            <select
              onChange={e => {
                this.setState({ tasswik_machakil: e.target.value });
              }}
              value={this.state.tasswik_machakil}
            >
              <option value="motadabdib">السوق متذبذب</option>
              <option value="takhzin">التخزين</option>
              <option value="thakafa_istihlak">ثقافة الاستهلاك</option>
              <option value="nakl">النقل</option>
              <option value="takhar_daf3">تأخر الدفع</option>
              <option value="dab7">الذبح</option>
            </select>
          </Label>
          <Label label="هل قمت باشهار لمنتوجك">
            <input
              type="checkbox"
              onChange={e => {
                this.setState({ tasswik_ishar_li_mantojk: e.target.checked });
              }}
              checked={this.state.tasswik_ishar_li_mantojk}
              placeholder="tasswik_ishar_li_mantojk"
            />
          </Label>
          <Label label="كيف تم ذلك">
            <input
              onChange={e => {
                this.setState({ tasswik_ishar_li_mantojk_how: e.target.value });
              }}
              value={this.state.tasswik_ishar_li_mantojk_how}
              placeholder="tasswik_ishar_li_mantojk_how"
            />
          </Label>
          <Label label="كيف كانت ردة الفعل">
            <select
              onChange={e => {
                this.setState({
                  tasswik_ishar_li_mantojk_radat_fi3l: e.target.value
                });
              }}
              value={this.state.tasswik_ishar_li_mantojk_radat_fi3l}
            >
              <option value="lamobalat">اللا مبالاة</option>
              <option value="ihtimam">إهتمام</option>
              <option value="lachaya">لا شيء</option>
            </select>
          </Label>
          <button onClick={() => this._create()}>إنشاء</button>
        </div>
      </div>
    );
  }
}

class Edit extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      user_id: 0,
      farmer_number: "",
      farmer_monkharit: true,
      farmer_monkharit_prix: 0,
      farmer_sex: "man",
      farmer_last_name: "",
      farmer_first_name: "",
      farmer_birth_day: "",
      farmer_address: "",
      farmer_tel: "",
      farmer_job: "",
      farmer_morabi_card: false,
      farmer_level_educ: "univ",
      // mazra3a
      farm_name: "",
      farm_address: "",
      farm_wilaya: "",
      farm_year_begin: "",
      farm_7ala: "",
      farm_position_people: "far",
      farm_geran: "me",
      farm_geran_level_edcu: "univ",
      farm_takwin_tarbiyat_aranib: "morabi",
      farm_takwin_tarbiyat_aranib_year: "",
      farm_takwin_tarbiyat_aranib_duree: 1,
      farm_number_employe: 5,
      // aranib
      arnab_solala: "hajin",
      arnab_date_imtilak: "",
      arnab_imtilak_why: "",
      arnab_number_mothers: 0,
      arnab_number_fathers: 0,
      arnab_mothers_prix: 0.0,
      arnab_fathers_prix: 0.0,
      arnab_amrad: "tanafos",
      arnab_darwa_intaj: 0,
      arnab_date_tajdid_kati3: "",
      arnab_ratm_intaj: "mokathaf",
      arnab_3omr_intaj: 0,
      arnab_naw3_talki7: "tabi3i",
      arnab_3omr_fitam: 0,
      arnab_motawassit_intaj: 0,
      arnab_nissbat_wafayat: "fawk5",
      // mo3idat tarbiya
      mo3idat_numbers_ambar: 0,
      mo3idat_missa7a_ambar: 0,
      mo3idat_gaz: true,
      mo3idat_eau: true,
      mo3idat_elect: true,
      mo3idat_khazan_eau: true,
      mo3idat_khazan_eau_si3a: 0,
      mo3idat_madba7_wilaya: true,
      mo3idat_mosta3mala_7arara_tahwiya: "",
      mo3idat_akfass_total: 0,
      mo3idat_akfass_mothers: 0,
      mo3idat_akfass_fathers: 0,
      mo3idat_akfass_tassmin: 0,
      mo3idat_naw3_akfass: "ma7ali",
      // tagdiya
      tagdiya_name_3ilaf: "sim",
      tagdiya_3ilaf_mada_idafiya: true,
      tagdiya_3ilaf_tarika_chiraa: "derect",
      tagdiya_3ilaf_prix: 0.0,
      tagdiya_3ilaf_massa3ib: "bo3d_massafa",
      // ri3aya
      ri3aya_numbers_bayatira: 0,
      ri3aya_mantojat_saydalaniya: true,
      ri3aya_mantojat_saydalaniya_no: "",
      ri3aya_mantojat_saydalaniya_yes: "",
      ri3aya_talki7: "",
      ri3aya_talki7_prix: 0,
      ri3aya_adwiya_mosta3mala: "",
      ri3aya_mo3akimat_mosta3mala: "",
      ri3aya_tamtalik_i3timad_si7i: true,
      // tasswik,
      tasswik_motawassit_wazn_bay3_arnab: 0,
      tasswik_kayfiyat_bay3: "arnab",
      tasswik_prix_arnab_kg: 0.0,
      tasswik_ayna_yatim_bay3: "dakhil_ambar",
      tasswik_morakib_si7i_dab7: true,
      tasswik_barnamaj_dab7: "monadam",
      tasswik_zabon_raissi: "wassit",
      tasswik_rotab_mostahlikin: "",
      tasswik_bay3_montadam_nafss_kamiya: true,
      tasswik_numbers_bay3_montadam_nafss_kamiya: 0,
      tasswik_kayfiya_takhzin: "madbo7",
      tasswik_modat_takhzin: "motawassita",
      tasswik_machakil: "motadabdib",
      tasswik_ishar_li_mantojk: true,
      tasswik_ishar_li_mantojk_how: "",
      tasswik_ishar_li_mantojk_radat_fi3l: "lamobalat"
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    WebServices.getFarmer(id)
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
    WebServices.editFarmer({ ...this.state })
      .then(res => {
        alert("farmer updated success");
        this.props.history.replace("/farmers");
      })
      .catch(err => {
        alert(err);
      });
  }
  render() {
    return (
      <div>
        <Header back history={this.props.history} title="تعديل" />
        <h2 style={{ textAlign: "right", color: "#3F51B5" }}>
          معلومات عن المربي
        </h2>
        <div>
          <Label label="الترقيم">
            <input
              onChange={e => {
                this.setState({ farmer_number: e.target.value });
              }}
              value={this.state.farmer_number}
              placeholder="farmer_number"
            />
          </Label>
          <Label label="هل أنت منخرط">
            <input
              type="checkbox"
              onChange={e => {
                this.setState({
                  farmer_monkharit: e.target.checked
                });
              }}
              checked={this.state.farmer_monkharit}
              placeholder="farmer_monkharit"
            />
          </Label>
          <Label label="ثمن الإنخراط">
            <input
              onChange={e => {
                this.setState({ farmer_monkharit_prix: e.target.value });
              }}
              value={this.state.farmer_monkharit_prix}
              placeholder=""
              type="number"
            />
          </Label>
          <Label label="الجنس">
            <select
              onChange={e => {
                this.setState({ farmer_sex: e.target.value });
              }}
              value={this.state.farmer_sex}
            >
              <option value="man">ذكر</option>
              <option value="woman">أنثى</option>
            </select>
          </Label>
          <Label label="الإسم">
            <input
              onChange={e => {
                this.setState({ farmer_last_name: e.target.value });
              }}
              value={this.state.farmer_last_name}
              placeholder="farmer_last_name"
            />
          </Label>
          <Label label="اللقب">
            <input
              onChange={e => {
                this.setState({ farmer_first_name: e.target.value });
              }}
              value={this.state.farmer_first_name}
              placeholder="farmer_first_name"
            />
          </Label>
          <Label label="تاريخ الميلاد">
            <input
              type="date"
              onChange={e => {
                this.setState({ farmer_birth_day: e.target.value });
              }}
              value={this.state.farmer_birth_day}
              placeholder="farmer_birth_day"
            />
          </Label>
          <Label label="العنوان">
            <input
              onChange={e => {
                this.setState({ farmer_address: e.target.value });
              }}
              value={this.state.farmer_address}
              placeholder="farmer_address"
            />
          </Label>
          <Label label="رقم الهاتف">
            <input
              onChange={e => {
                this.setState({ farmer_tel: e.target.value });
              }}
              value={this.state.farmer_tel}
              placeholder="farmer_tel"
            />
          </Label>
          <Label label="المهنة">
            <input
              onChange={e => {
                this.setState({ farmer_job: e.target.value });
              }}
              value={this.state.farmer_job}
              placeholder="farmer_job"
            />
          </Label>
          <Label label="هل لديك بطاقة مربي">
            <input
              type="checkbox"
              onChange={e => {
                this.setState({ farmer_morabi_card: e.target.checked });
              }}
              checked={this.state.farmer_morabi_card}
              placeholder="farmer_morabi_card"
            />
          </Label>
          <Label label="المستوى الدراسي">
            <select
              onChange={e => {
                this.setState({ farmer_level_educ: e.target.value });
              }}
              value={this.state.farmer_level_educ}
            >
              <option value="primaire">إبتدائي</option>
              <option value="seam">متوسط</option>
              <option value="laicy">ثانوي</option>
              <option value="mihani">تكوين مهني</option>
              <option value="univ">جامعي</option>
            </select>
          </Label>
          <h2 style={{ textAlign: "right", color: "#3F51B5" }}>
            معلومات عن المزرعة
          </h2>
          <Label label="الإسم">
            <input
              onChange={e => {
                this.setState({ farm_name: e.target.value });
              }}
              value={this.state.farm_name}
              placeholder="farm_name"
            />
          </Label>
          <Label label="العنوان">
            <input
              onChange={e => {
                this.setState({ farm_address: e.target.value });
              }}
              value={this.state.farm_address}
              placeholder="farm_address"
            />
          </Label>
          <Label label="الرقم الولائي">
            <input
              onChange={e => {
                this.setState({ farm_wilaya: e.target.value });
              }}
              value={this.state.farm_wilaya}
              placeholder="farm_wilaya"
            />
          </Label>
          <Label label="سنة الإفتتاح">
            <input
              onChange={e => {
                this.setState({ farm_year_begin: e.target.value });
              }}
              value={this.state.farm_year_begin}
              placeholder="farm_year_begin"
            />
          </Label>
          <Label label="الحالة">
            <select
              onChange={e => {
                this.setState({ farm_7ala: e.target.value });
              }}
              value={this.state.farm_7ala}
            >
              <option value="milkia">ملكية</option>
              <option value="kiraa">كراء</option>
              <option value="other">شيء آخر</option>
            </select>
          </Label>
          <Label label="موقع المزرعة بالنسبة للسكان">
            <select
              onChange={e => {
                this.setState({ farm_position_people: e.target.value });
              }}
              value={this.state.farm_position_people}
            >
              <option value="nearby">قريب</option>
              <option value="far">بعيد</option>
            </select>
          </Label>
          <Label label="المسير">
            <select
              onChange={e => {
                this.setState({ farm_geran: e.target.value });
              }}
              value={this.state.farm_geran}
            >
              <option value="me">أنا</option>
              <option value="other">آخر</option>
            </select>
          </Label>
          <Label label="المستوى الدراسي للمسير">
            <select
              onChange={e => {
                this.setState({ farm_geran_level_edcu: e.target.value });
              }}
              value={this.state.farm_geran_level_edcu}
            >
              <option value="primaire">إبتدائي</option>
              <option value="seam">متوسط</option>
              <option value="laicy">ثانوي</option>
              <option value="mihani">تكوين مهني</option>
              <option value="univ">جامعي</option>
            </select>
          </Label>
          <Label label="أين تلقيت تكوينك">
            <select
              onChange={e => {
                this.setState({ farm_takwin_tarbiyat_aranib: e.target.value });
              }}
              value={this.state.farm_takwin_tarbiyat_aranib}
            >
              <option value="morabi">مربي</option>
              <option value="ma3had">معهد</option>
              <option value="taraboss">تربص</option>
              <option value="self">ذاتي</option>
            </select>
          </Label>
          <Label label="سنة التكوين">
            <input
              type="date"
              onChange={e => {
                this.setState({
                  farm_takwin_tarbiyat_aranib_year: e.target.value
                });
              }}
              value={this.state.farm_takwin_tarbiyat_aranib_year}
              placeholder="farm_takwin_tarbiyat_aranib_year"
            />
          </Label>
          <Label label="مدة التكوين">
            <input
              onChange={e => {
                this.setState({
                  farm_takwin_tarbiyat_aranib_duree: e.target.value
                });
              }}
              value={this.state.farm_takwin_tarbiyat_aranib_duree}
              placeholder="farm_takwin_tarbiyat_aranib_duree"
            />
          </Label>
          <Label label="عدد العمال">
            <input
              type="number"
              onChange={e => {
                this.setState({ farm_number_employe: e.target.value });
              }}
              value={this.state.farm_number_employe}
              placeholder="farm_number_employe"
            />
          </Label>
          <h2 style={{ textAlign: "right", color: "#3F51B5" }}>
            معلومات عن الأرنب
          </h2>
          <Label label="السلالة">
            <select
              onChange={e => {
                this.setState({ arnab_solala: e.target.value });
              }}
              value={this.state.arnab_solala}
            >
              <option value="hajin">هجين</option>
              <option value="santitik">سانتيتيك</option>
              <option value="geant">عملاق</option>
              <option value="other">آخر</option>
            </select>
          </Label>
          <Label label="منذ متى تمتلكها">
            <input
              onChange={e => {
                this.setState({ arnab_date_imtilak: e.target.value });
              }}
              value={this.state.arnab_date_imtilak}
              placeholder="arnab_date_imtilak"
            />
          </Label>
          <Label label="لماذا اخترت هاته السلالة">
            <input
              onChange={e => {
                this.setState({ arnab_imtilak_why: e.target.value });
              }}
              value={this.state.arnab_imtilak_why}
              placeholder="arnab_imtilak_why"
            />
          </Label>
          <Label label="عدد الأمهات">
            <input
              type="number"
              onChange={e => {
                this.setState({ arnab_number_mothers: e.target.value });
              }}
              value={this.state.arnab_number_mothers}
              placeholder="arnab_number_mothers"
            />
          </Label>
          <Label label="عدد الذكور">
            <input
              type="number"
              onChange={e => {
                this.setState({ arnab_number_fathers: e.target.value });
              }}
              value={this.state.arnab_number_fathers}
              placeholder="arnab_number_fathers"
            />
          </Label>
          <Label label="ثمن شراء الإناث">
            <input
              type="number"
              onChange={e => {
                this.setState({ arnab_mothers_prix: e.target.value });
              }}
              value={this.state.arnab_mothers_prix}
              placeholder="arnab_mothers_prix"
            />
          </Label>
          <Label label="ثمن شراء الذكور">
            <input
              type="number"
              onChange={e => {
                this.setState({ arnab_fathers_prix: e.target.value });
              }}
              value={this.state.arnab_fathers_prix}
              placeholder="arnab_fathers_prix"
            />
          </Label>
          <Label label="لأمراض التي يعاني منها القطيع">
            <input
              type="text"
              onChange={e => {
                this.setState({ arnab_amrad: e.target.value });
              }}
              value={this.state.arnab_amrad}
              placeholder="بكتيريا فيروسية تنفسية هضمية "
            />
          </Label>
          <Label label="ذروة الإنتاج">
            <input
              type="text"
              onChange={e => {
                this.setState({ arnab_darwa_intaj: e.target.value });
              }}
              value={this.state.arnab_darwa_intaj}
              placeholder="arnab_darwa_intaj"
            />
          </Label>
          <Label label="وقت تجديد القطيع">
            <input
              type="text"
              onChange={e => {
                this.setState({ arnab_date_tajdid_kati3: e.target.value });
              }}
              value={this.state.arnab_date_tajdid_kati3}
              placeholder="شهور التجديد"
            />
          </Label>
          <Label label="رتم الإنتاج">
            <select
              onChange={e => {
                this.setState({ arnab_ratm_intaj: e.target.value });
              }}
              value={this.state.arnab_ratm_intaj}
            >
              <option value="mokathaf">مكثف</option>
              <option value="nisf_mokathaf">نصف مكثف</option>
              <option value="3achwai">عشوائي</option>
            </select>
          </Label>
          <Label label="عمر الإنتاج لقطيع الإحلال">
            <input
              type="number"
              onChange={e => {
                this.setState({ arnab_3omr_intaj: e.target.value });
              }}
              value={this.state.arnab_3omr_intaj}
              placeholder="arnab_3omr_intaj"
            />
          </Label>
          <Label label="نوع التلقيح">
            <select
              onChange={e => {
                this.setState({ arnab_naw3_talki7: e.target.value });
              }}
              value={this.state.arnab_naw3_talki7}
            >
              <option value="tabi3i">طبيعي</option>
              <option value="istina3i">اصطناعي</option>
            </select>
          </Label>
          <Label label="عمر الفطام">
            <input
              type="number"
              onChange={e => {
                this.setState({ arnab_3omr_fitam: e.target.value });
              }}
              value={this.state.arnab_3omr_fitam}
              placeholder="arnab_3omr_fitam"
            />
          </Label>
          <Label label="متوسط الإنتاج">
            <input
              type="number"
              onChange={e => {
                this.setState({ arnab_motawassit_intaj: e.target.value });
              }}
              value={this.state.arnab_motawassit_intaj}
              placeholder="arnab_motawassit_intaj"
            />
          </Label>
          <Label label="نسبة الوفيات">
            <select
              onChange={e => {
                this.setState({ arnab_nissbat_wafayat: e.target.value });
              }}
              value={this.state.arnab_nissbat_wafayat}
            >
              <option value="fawk5">فوق %5</option>
              <option value="istina3i">تحت %5</option>
            </select>
          </Label>
          <h2 style={{ textAlign: "right", color: "#3F51B5" }}>
            معدات التربية
          </h2>
          <Label label="عدد العنابر">
            <input
              type="number"
              onChange={e => {
                this.setState({ mo3idat_numbers_ambar: e.target.value });
              }}
              value={this.state.mo3idat_numbers_ambar}
              placeholder="mo3idat_numbers_ambar"
            />
          </Label>
          <Label label="مساحة العمبر">
            <input
              type="number"
              onChange={e => {
                this.setState({ mo3idat_missa7a_ambar: e.target.value });
              }}
              value={this.state.mo3idat_missa7a_ambar}
              placeholder="mo3idat_missa7a_ambar"
            />
          </Label>
          <Label label="الغاز موجود؟">
            <input
              type="checkbox"
              onChange={e => {
                this.setState({ mo3idat_gaz: e.target.checked });
              }}
              checked={this.state.mo3idat_gaz}
              placeholder="mo3idat_gaz"
            />
          </Label>
          <Label label="الماء موجود؟">
            <input
              type="checkbox"
              onChange={e => {
                this.setState({ mo3idat_eau: e.target.checked });
              }}
              checked={this.state.mo3idat_eau}
              placeholder="mo3idat_eau"
            />
          </Label>
          <Label label="الكهرباء موجود؟">
            <input
              type="checkbox"
              onChange={e => {
                this.setState({ mo3idat_elect: e.target.checked });
              }}
              checked={this.state.mo3idat_elect}
              placeholder="mo3idat_elect"
            />
          </Label>
          <Label label="هل لديك خزان الماء">
            <input
              type="checkbox"
              onChange={e => {
                this.setState({ mo3idat_khazan_eau: e.target.checked });
              }}
              checked={this.state.mo3idat_khazan_eau}
              placeholder="mo3idat_khazan_eau"
            />
          </Label>
          <Label label="سعة الخزان">
            <input
              type="number"
              onChange={e => {
                this.setState({ mo3idat_khazan_eau_si3a: e.target.value });
              }}
              value={this.state.mo3idat_khazan_eau_si3a}
              placeholder="mo3idat_khazan_eau_si3a"
            />
          </Label>
          <Label label="هل يوجد مذبح في ولايتك">
            <input
              type="checkbox"
              onChange={e => {
                this.setState({ mo3idat_madba7_wilaya: e.target.checked });
              }}
              checked={this.state.mo3idat_madba7_wilaya}
              placeholder="mo3idat_madba7_wilaya"
            />
          </Label>
          <Label label="المعدات المستعملة في التحكم بدرجة الحرارة والتهوية">
            <input
              onChange={e => {
                this.setState({
                  mo3idat_mosta3mala_7arara_tahwiya: e.target.value
                });
              }}
              value={this.state.mo3idat_mosta3mala_7arara_tahwiya}
              placeholder="mo3idat_mosta3mala_7arara_tahwiya"
            />
          </Label>
          <Label label="عدد الأقفاص الإجمالي">
            <input
              type="number"
              onChange={e => {
                this.setState({ mo3idat_akfass_total: e.target.value });
              }}
              value={this.state.mo3idat_akfass_total}
              placeholder="mo3idat_akfass_total"
            />
          </Label>
          <Label label="عدد أقفاص الإناث">
            <input
              type="number"
              onChange={e => {
                this.setState({ mo3idat_akfass_mothers: e.target.value });
              }}
              value={this.state.mo3idat_akfass_mothers}
              placeholder="mo3idat_akfass_mothers"
            />
          </Label>
          <Label label="عدد أقفاص الذكور">
            <input
              type="number"
              onChange={e => {
                this.setState({ mo3idat_akfass_fathers: e.target.value });
              }}
              value={this.state.mo3idat_akfass_fathers}
              placeholder="mo3idat_akfass_fathers"
            />
          </Label>
          <Label label="عدد أقفاص التسمين">
            <input
              type="number"
              onChange={e => {
                this.setState({ mo3idat_akfass_tassmin: e.target.value });
              }}
              value={this.state.mo3idat_akfass_tassmin}
              placeholder="mo3idat_akfass_tassmin"
            />
          </Label>
          <Label label="نوع الأقفاص">
            <select
              onChange={e => {
                this.setState({ mo3idat_naw3_akfass: e.target.value });
              }}
              value={this.state.mo3idat_naw3_akfass}
            >
              <option value="mostawrad">مستورد</option>
              <option value="ma7ali">محلي</option>
            </select>
          </Label>
          <h2 style={{ textAlign: "right", color: "#3F51B5" }}>التغذية</h2>
          <Label label="إسم المصنع للعلف">
            <select
              onChange={e => {
                this.setState({ tagdiya_name_3ilaf: e.target.value });
              }}
              value={this.state.tagdiya_name_3ilaf}
            >
              <option value="sim">سيم</option>
              <option value="kharboch">خربوش</option>
              <option value="wachfon">وشفون</option>
              <option value="other">غير ذلك</option>
            </select>
          </Label>
          <Label label="هل تستعمل إضافة أخرى">
            <input
              type="checkbox"
              onChange={e => {
                this.setState({ tagdiya_3ilaf_mada_idafiya: e.target.checked });
              }}
              checked={this.state.tagdiya_3ilaf_mada_idafiya}
              placeholder="tagdiya_3ilaf_mada_idafiya"
            />
          </Label>
          <Label label="طريقة الشراء">
            <select
              onChange={e => {
                this.setState({ tagdiya_3ilaf_tarika_chiraa: e.target.value });
              }}
              value={this.state.tagdiya_3ilaf_tarika_chiraa}
            >
              <option value="derect">مباشرة من المصنع</option>
              <option value="mowazi3_a">موزع أ</option>
              <option value="mowazi3_b">موزع ب</option>
            </select>
          </Label>
          <Label label="ثمن العلف للقنطار">
            <input
              type="number"
              onChange={e => {
                this.setState({ tagdiya_3ilaf_prix: e.target.value });
              }}
              value={this.state.tagdiya_3ilaf_prix}
              placeholder="tagdiya_3ilaf_prix"
            />
          </Label>
          <Label label="مصاعب شراء العلف">
            <input
              onChange={e => {
                this.setState({ tagdiya_3ilaf_massa3ib: e.target.value });
              }}
              value={this.state.tagdiya_3ilaf_massa3ib}
              placeholder="ما هي المصاعب؟"
            />
          </Label>
          <h2 style={{ textAlign: "right", color: "#3F51B5" }}>الرعاية</h2>
          <Label label="عدد البياطرة">
            <input
              type="number"
              onChange={e => {
                this.setState({ ri3aya_numbers_bayatira: e.target.value });
              }}
              value={this.state.ri3aya_numbers_bayatira}
              placeholder="ri3aya_numbers_bayatira"
            />
          </Label>
          <Label label="هل تستعمل المنتوجات الصيدلانية">
            <input
              type="checkbox"
              onChange={e => {
                this.setState({
                  ri3aya_mantojat_saydalaniya: e.target.checked
                });
              }}
              checked={this.state.ri3aya_mantojat_saydalaniya}
              placeholder="ri3aya_mantojat_saydalaniya"
            />
          </Label>
          <Label label="إذا كانت الإجابة ب لا">
            <input
              onChange={e => {
                this.setState({
                  ri3aya_mantojat_saydalaniya_no: e.target.value
                });
              }}
              value={this.state.ri3aya_mantojat_saydalaniya_no}
              placeholder="ri3aya_mantojat_saydalaniya_no"
            />
          </Label>
          <Label label="إذا كانت الإجابة ب نعم">
            <input
              onChange={e => {
                this.setState({
                  ri3aya_mantojat_saydalaniya_yes: e.target.value
                });
              }}
              value={this.state.ri3aya_mantojat_saydalaniya_yes}
              placeholder="ri3aya_mantojat_saydalaniya_yes"
            />
          </Label>
          <Label label="التلقيح">
            <input
              type="text"
              onChange={e => {
                this.setState({ ri3aya_talki7: e.target.value });
              }}
              value={this.state.ri3aya_talki7}
              placeholder="كوكلافاكس بارفاك vhd1 vhd2"
            />
          </Label>
          <Label label="ثمن التلقيح">
            <input
              type="number"
              onChange={e => {
                this.setState({ ri3aya_talki7_prix: e.target.value });
              }}
              value={this.state.ri3aya_talki7_prix}
              placeholder="ri3aya_talki7_prix"
            />
          </Label>
          <Label label="الأدوية المستعملة">
            <input
              onChange={e => {
                this.setState({ ri3aya_adwiya_mosta3mala: e.target.value });
              }}
              value={this.state.ri3aya_adwiya_mosta3mala}
              placeholder="ri3aya_adwiya_mosta3mala"
            />
          </Label>
          <Label label="المعقمات المستعملة">
            <input
              onChange={e => {
                this.setState({ ri3aya_mo3akimat_mosta3mala: e.target.value });
              }}
              value={this.state.ri3aya_mo3akimat_mosta3mala}
              placeholder="ri3aya_mo3akimat_mosta3mala"
            />
          </Label>
          <Label label="هل تمتلك إعتماد صحي">
            <input
              type="checkbox"
              onChange={e => {
                this.setState({
                  ri3aya_tamtalik_i3timad_si7i: e.target.checked
                });
              }}
              checked={this.state.ri3aya_tamtalik_i3timad_si7i}
              placeholder="tagdiya_3ilaf_mada_idafiya"
            />
          </Label>
          <h2 style={{ textAlign: "right", color: "#3F51B5" }}>التسويق</h2>
          <Label label="متوسط وزن الأرنب عند البيع">
            <input
              type="number"
              onChange={e => {
                this.setState({
                  tasswik_motawassit_wazn_bay3_arnab: e.target.value
                });
              }}
              value={this.state.tasswik_motawassit_wazn_bay3_arnab}
              placeholder="tasswik_motawassit_wazn_bay3_arnab"
            />
          </Label>
          <Label label="كيفية البيع">
            <select
              onChange={e => {
                this.setState({ tasswik_kayfiyat_bay3: e.target.value });
              }}
              value={this.state.tasswik_kayfiyat_bay3}
            >
              <option value="arnab">بالأرنب</option>
              <option value="mizan">الميزان</option>
            </select>
          </Label>
          <Label label="الثمن">
            <input
              type="number"
              onChange={e => {
                this.setState({ tasswik_prix_arnab_kg: e.target.value });
              }}
              value={this.state.tasswik_prix_arnab_kg}
              placeholder="tasswik_prix_arnab_kg"
            />
          </Label>
          <Label label="هل يوجد مراقب صحي عند الذبح">
            <input
              type="checkbox"
              onChange={e => {
                this.setState({ tasswik_morakib_si7i_dab7: e.target.checked });
              }}
              checked={this.state.tasswik_morakib_si7i_dab7}
              placeholder="tagdiya_3ilaf_mada_idafiya"
            />
          </Label>
          <Label label="برنامج الذبح">
            <select
              onChange={e => {
                this.setState({ tasswik_barnamaj_dab7: e.target.value });
              }}
              value={this.state.tasswik_barnamaj_dab7}
            >
              <option value="monadam">منظم</option>
              <option value="gayr_monadam">غير منظم</option>
            </select>
          </Label>
          <Label label="الزبون الرئيسي">
            <select
              onChange={e => {
                this.setState({ tasswik_zabon_raissi: e.target.value });
              }}
              value={this.state.tasswik_zabon_raissi}
            >
              <option value="wassit">الوسيط</option>
              <option value="mata3im">مطاعم</option>
              <option value="souk">السوق</option>
              <option value="mostahlik_daim">مستهلك دائم</option>
            </select>
          </Label>
          <Label label="رتب المستهلكين">
            <input
              onChange={e => {
                this.setState({ tasswik_rotab_mostahlikin: e.target.value });
              }}
              value={this.state.tasswik_rotab_mostahlikin}
              placeholder="tasswik_rotab_mostahlikin"
            />
          </Label>
          <Label label="بيع منظم بنفس الكمية">
            <input
              type="checkbox"
              onChange={e => {
                this.setState({
                  tasswik_bay3_montadam_nafss_kamiya: e.target.checked
                });
              }}
              checked={this.state.tasswik_bay3_montadam_nafss_kamiya}
              placeholder="tagdiya_3ilaf_mada_idafiya"
            />
          </Label>
          <Label label="كمية البيع">
            <input
              type="number"
              onChange={e => {
                this.setState({
                  tasswik_numbers_bay3_montadam_nafss_kamiya: e.target.value
                });
              }}
              value={this.state.tasswik_numbers_bay3_montadam_nafss_kamiya}
              placeholder="tasswik_numbers_bay3_montadam_nafss_kamiya"
            />
          </Label>
          <Label label="كيفية التخزين">
            <select
              onChange={e => {
                this.setState({ tasswik_kayfiya_takhzin: e.target.value });
              }}
              value={this.state.tasswik_kayfiya_takhzin}
            >
              <option value="madbo7">مذبوح</option>
              <option value="7ay">حي</option>
            </select>
          </Label>
          <Label label="مدة التخزين">
            <select
              onChange={e => {
                this.setState({ tasswik_modat_takhzin: e.target.value });
              }}
              value={this.state.tasswik_modat_takhzin}
            >
              <option value="motawassita">متوسطة</option>
              <option value="9assira">قصيرة</option>
              <option value="tawila">طويلة</option>
            </select>
          </Label>
          <Label label="مشاكل التسويق">
            <select
              onChange={e => {
                this.setState({ tasswik_machakil: e.target.value });
              }}
              value={this.state.tasswik_machakil}
            >
              <option value="motadabdib">السوق متذبذب</option>
              <option value="takhzin">التخزين</option>
              <option value="thakafa_istihlak">ثقافة الاستهلاك</option>
              <option value="nakl">النقل</option>
              <option value="takhar_daf3">تأخر الدفع</option>
              <option value="dab7">الذبح</option>
            </select>
          </Label>
          <Label label="هل قمت باشهار لمنتوجك">
            <input
              type="checkbox"
              onChange={e => {
                this.setState({ tasswik_ishar_li_mantojk: e.target.checked });
              }}
              checked={this.state.tasswik_ishar_li_mantojk}
              placeholder="tasswik_ishar_li_mantojk"
            />
          </Label>
          <Label label="كيف تم ذلك">
            <input
              onChange={e => {
                this.setState({ tasswik_ishar_li_mantojk_how: e.target.value });
              }}
              value={this.state.tasswik_ishar_li_mantojk_how}
              placeholder="tasswik_ishar_li_mantojk_how"
            />
          </Label>
          <Label label="كيف كانت ردة الفعل">
            <select
              onChange={e => {
                this.setState({
                  tasswik_ishar_li_mantojk_radat_fi3l: e.target.value
                });
              }}
              value={this.state.tasswik_ishar_li_mantojk_radat_fi3l}
            >
              <option value="lamobalat">اللا مبالاة</option>
              <option value="ihtimam">إهتمام</option>
              <option value="lachaya">لا شيء</option>
            </select>
          </Label>
          <button onClick={() => this._update()}>تحديث</button>
        </div>
      </div>
    );
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
    );
  }
}

export default Users;
