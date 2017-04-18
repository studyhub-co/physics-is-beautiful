from __future__ import unicode_literals
from django.db import models


class NcesDb(models.Model):
    index = models.IntegerField(primary_key=True)
    academicyear = models.IntegerField(blank=True, null=True)
    unitid = models.IntegerField(blank=True, null=True)
    instname = models.TextField(blank=True, null=True)
    city = models.TextField(blank=True, null=True)
    state = models.TextField(blank=True, null=True)
    zip = models.TextField(blank=True, null=True)
    sector_revised = models.IntegerField(blank=True, null=True)
    iclevel = models.IntegerField(blank=True, null=True)
    control = models.IntegerField(blank=True, null=True)
    oberegion = models.IntegerField(blank=True, null=True)
    census_division = models.IntegerField(blank=True, null=True)
    census_region = models.IntegerField(blank=True, null=True)
    flagship = models.IntegerField(blank=True, null=True)
    landgrnt = models.IntegerField(blank=True, null=True)
    hbcu = models.IntegerField(blank=True, null=True)
    hsi = models.IntegerField(blank=True, null=True)
    medical = models.IntegerField(blank=True, null=True)
    hospital = models.IntegerField(blank=True, null=True)
    fte_count = models.FloatField(blank=True, null=True)
    tuition03 = models.FloatField(blank=True, null=True)
    govt_reliance_c = models.FloatField(blank=True, null=True)
    fed_grant_pct = models.FloatField(blank=True, null=True)
    fed_grant_avg_amount = models.FloatField(blank=True, null=True)
    state_grant_pct = models.FloatField(blank=True, null=True)
    state_grant_avg_amount = models.FloatField(blank=True, null=True)
    inst_grant_pct = models.FloatField(blank=True, null=True)
    inst_grant_avg_amount = models.FloatField(blank=True, null=True)
    loan_pct = models.FloatField(blank=True, null=True)
    loan_avg_amount = models.FloatField(blank=True, null=True)
    tuitionfee01_tf = models.FloatField(blank=True, null=True)
    tuitionfee02_tf = models.FloatField(blank=True, null=True)
    tuitionfee03_tf = models.FloatField(blank=True, null=True)
    research01_fasb = models.FloatField(blank=True, null=True)
    gross_operating_margin = models.FloatField(blank=True, null=True)
    assets06 = models.FloatField(blank=True, null=True)
    grad_rate_150_p = models.FloatField(blank=True, null=True)
    ptretention_rate = models.FloatField(blank=True, null=True)
    total_undergraduates = models.FloatField(blank=True, null=True)
    total_graduates = models.FloatField(blank=True, null=True)
    total_enrollment = models.FloatField(blank=True, null=True)
    total_enrollment_amin_tot = models.FloatField(blank=True, null=True)
    total_enrollment_asian_tot = models.FloatField(blank=True, null=True)
    total_enrollment_black_tot = models.FloatField(blank=True, null=True)
    total_enrollment_hisp_tot = models.FloatField(blank=True, null=True)
    total_enrollment_white_tot = models.FloatField(blank=True, null=True)
    total_enrollment_multi_tot = models.FloatField(blank=True, null=True)
    total_enrollment_unkn_tot = models.FloatField(blank=True, null=True)
    total_enrollment_nonres_tot = models.FloatField(blank=True, null=True)
    applcn = models.FloatField(blank=True, null=True)
    applcnm = models.FloatField(blank=True, null=True)
    applcnw = models.FloatField(blank=True, null=True)
    admssn = models.FloatField(blank=True, null=True)
    admssnm = models.FloatField(blank=True, null=True)
    admssnw = models.FloatField(blank=True, null=True)
    actcm25 = models.FloatField(blank=True, null=True)
    actcm75 = models.FloatField(blank=True, null=True)
    acten25 = models.FloatField(blank=True, null=True)
    acten75 = models.FloatField(blank=True, null=True)
    actmt25 = models.FloatField(blank=True, null=True)
    actmt75 = models.FloatField(blank=True, null=True)
    satmt25 = models.FloatField(blank=True, null=True)
    satmt75 = models.FloatField(blank=True, null=True)
    satvr25 = models.FloatField(blank=True, null=True)
    satvr75 = models.FloatField(blank=True, null=True)
    ft_faculty_salary = models.FloatField(blank=True, null=True)

    class Meta:
        db_table = 'nces_db'


class Collegescorecard(models.Model):
    unitid = models.IntegerField(db_column='UNITID', blank=True, null=True)  # Field name made lowercase.
    instnm = models.TextField(db_column='INSTNM', blank=True, null=True)  # Field name made lowercase.
    city = models.TextField(db_column='CITY', blank=True, null=True)  # Field name made lowercase.
    stabbr = models.TextField(db_column='STABBR', blank=True, null=True)  # Field name made lowercase.
    zip = models.TextField(db_column='ZIP', blank=True, null=True)  # Field name made lowercase.
    accredagency = models.TextField(db_column='ACCREDAGENCY', blank=True, null=True)  # Field name made lowercase.
    insturl = models.TextField(db_column='INSTURL', blank=True, null=True)  # Field name made lowercase.
    npcurl = models.TextField(db_column='NPCURL', blank=True, null=True)  # Field name made lowercase.
    sch_deg = models.TextField(db_column='SCH_DEG', blank=True, null=True)  # Field name made lowercase.
    hcm2 = models.TextField(db_column='HCM2', blank=True, null=True)  # Field name made lowercase.
    main = models.IntegerField(db_column='MAIN', blank=True, null=True)  # Field name made lowercase.
    numbranch = models.IntegerField(db_column='NUMBRANCH', blank=True, null=True)  # Field name made lowercase.
    preddeg = models.IntegerField(db_column='PREDDEG', blank=True, null=True)  # Field name made lowercase.
    highdeg = models.IntegerField(db_column='HIGHDEG', blank=True, null=True)  # Field name made lowercase.
    control = models.IntegerField(db_column='CONTROL', blank=True, null=True)  # Field name made lowercase.
    region = models.IntegerField(db_column='REGION', blank=True, null=True)  # Field name made lowercase.
    locale = models.TextField(db_column='LOCALE', blank=True, null=True)  # Field name made lowercase.
    latitude = models.TextField(db_column='LATITUDE', blank=True, null=True)  # Field name made lowercase.
    longitude = models.TextField(db_column='LONGITUDE', blank=True, null=True)  # Field name made lowercase.
    ccbasic = models.TextField(db_column='CCBASIC', blank=True, null=True)  # Field name made lowercase.
    ccugprof = models.TextField(db_column='CCUGPROF', blank=True, null=True)  # Field name made lowercase.
    ccsizset = models.TextField(db_column='CCSIZSET', blank=True, null=True)  # Field name made lowercase.
    hbcu = models.TextField(db_column='HBCU', blank=True, null=True)  # Field name made lowercase.
    pbi = models.TextField(db_column='PBI', blank=True, null=True)  # Field name made lowercase.
    annhi = models.TextField(db_column='ANNHI', blank=True, null=True)  # Field name made lowercase.
    tribal = models.TextField(db_column='TRIBAL', blank=True, null=True)  # Field name made lowercase.
    aanapii = models.TextField(db_column='AANAPII', blank=True, null=True)  # Field name made lowercase.
    hsi = models.TextField(db_column='HSI', blank=True, null=True)  # Field name made lowercase.
    nanti = models.TextField(db_column='NANTI', blank=True, null=True)  # Field name made lowercase.
    menonly = models.TextField(db_column='MENONLY', blank=True, null=True)  # Field name made lowercase.
    womenonly = models.TextField(db_column='WOMENONLY', blank=True, null=True)  # Field name made lowercase.
    relaffil = models.TextField(db_column='RELAFFIL', blank=True, null=True)  # Field name made lowercase.
    adm_rate = models.TextField(db_column='ADM_RATE', blank=True, null=True)  # Field name made lowercase.
    satvrmid = models.TextField(db_column='SATVRMID', blank=True, null=True)  # Field name made lowercase.
    satmtmid = models.TextField(db_column='SATMTMID', blank=True, null=True)  # Field name made lowercase.
    satwrmid = models.TextField(db_column='SATWRMID', blank=True, null=True)  # Field name made lowercase.
    actcmmid = models.TextField(db_column='ACTCMMID', blank=True, null=True)  # Field name made lowercase.
    actenmid = models.TextField(db_column='ACTENMID', blank=True, null=True)  # Field name made lowercase.
    actmtmid = models.TextField(db_column='ACTMTMID', blank=True, null=True)  # Field name made lowercase.
    actwrmid = models.TextField(db_column='ACTWRMID', blank=True, null=True)  # Field name made lowercase.
    sat_avg = models.TextField(db_column='SAT_AVG', blank=True, null=True)  # Field name made lowercase.
    ugds = models.FloatField(db_column='UGDS', blank=True, null=True)  # Field name made lowercase.
    ugds_white = models.TextField(db_column='UGDS_WHITE', blank=True, null=True)  # Field name made lowercase.
    ugds_black = models.TextField(db_column='UGDS_BLACK', blank=True, null=True)  # Field name made lowercase.
    ugds_hisp = models.TextField(db_column='UGDS_HISP', blank=True, null=True)  # Field name made lowercase.
    ugds_asian = models.TextField(db_column='UGDS_ASIAN', blank=True, null=True)  # Field name made lowercase.
    ugds_aian = models.TextField(db_column='UGDS_AIAN', blank=True, null=True)  # Field name made lowercase.
    ugds_nhpi = models.TextField(db_column='UGDS_NHPI', blank=True, null=True)  # Field name made lowercase.
    ugds_2mor = models.TextField(db_column='UGDS_2MOR', blank=True, null=True)  # Field name made lowercase.
    ugds_nra = models.FloatField(db_column='UGDS_NRA', blank=True, null=True)  # Field name made lowercase.
    pptug_ef = models.FloatField(db_column='PPTUG_EF', blank=True, null=True)  # Field name made lowercase.
    curroper = models.TextField(db_column='CURROPER', blank=True, null=True)  # Field name made lowercase.
    npt4_pub = models.TextField(db_column='NPT4_PUB', blank=True, null=True)  # Field name made lowercase.
    npt4_priv = models.TextField(db_column='NPT4_PRIV', blank=True, null=True)  # Field name made lowercase.
    npt41_pub = models.TextField(db_column='NPT41_PUB', blank=True, null=True)  # Field name made lowercase.
    npt45_pub = models.TextField(db_column='NPT45_PUB', blank=True, null=True)  # Field name made lowercase.
    npt41_priv = models.TextField(db_column='NPT41_PRIV', blank=True, null=True)  # Field name made lowercase.
    npt45_priv = models.TextField(db_column='NPT45_PRIV', blank=True, null=True)  # Field name made lowercase.
    npt4_048_pub = models.TextField(db_column='NPT4_048_PUB', blank=True, null=True)  # Field name made lowercase.
    npt4_048_priv = models.TextField(db_column='NPT4_048_PRIV', blank=True, null=True)  # Field name made lowercase.
    num4_pub = models.TextField(db_column='NUM4_PUB', blank=True, null=True)  # Field name made lowercase.
    num4_priv = models.TextField(db_column='NUM4_PRIV', blank=True, null=True)  # Field name made lowercase.
    num41_pub = models.TextField(db_column='NUM41_PUB', blank=True, null=True)  # Field name made lowercase.
    num45_pub = models.TextField(db_column='NUM45_PUB', blank=True, null=True)  # Field name made lowercase.
    num41_priv = models.TextField(db_column='NUM41_PRIV', blank=True, null=True)  # Field name made lowercase.
    num45_priv = models.TextField(db_column='NUM45_PRIV', blank=True, null=True)  # Field name made lowercase.
    costt4_a = models.TextField(db_column='COSTT4_A', blank=True, null=True)  # Field name made lowercase.
    costt4_p = models.TextField(db_column='COSTT4_P', blank=True, null=True)  # Field name made lowercase.
    tuitionfee_in = models.TextField(db_column='TUITIONFEE_IN', blank=True, null=True)  # Field name made lowercase.
    tuitionfee_out = models.TextField(db_column='TUITIONFEE_OUT', blank=True, null=True)  # Field name made lowercase.
    tuitfte = models.TextField(db_column='TUITFTE', blank=True, null=True)  # Field name made lowercase.
    inexpfte = models.TextField(db_column='INEXPFTE', blank=True, null=True)  # Field name made lowercase.
    avgfacsal = models.FloatField(db_column='AVGFACSAL', blank=True, null=True)  # Field name made lowercase.
    pftfac = models.TextField(db_column='PFTFAC', blank=True, null=True)  # Field name made lowercase.
    pctpell = models.TextField(db_column='PCTPELL', blank=True, null=True)  # Field name made lowercase.
    c150_4 = models.TextField(db_column='C150_4', blank=True, null=True)  # Field name made lowercase.
    c150_l4 = models.TextField(db_column='C150_L4', blank=True, null=True)  # Field name made lowercase.
    ret_ft4 = models.TextField(db_column='RET_FT4', blank=True, null=True)  # Field name made lowercase.
    ret_ftl4 = models.TextField(db_column='RET_FTL4', blank=True, null=True)  # Field name made lowercase.
    ret_pt4 = models.TextField(db_column='RET_PT4', blank=True, null=True)  # Field name made lowercase.
    ret_ptl4 = models.TextField(db_column='RET_PTL4', blank=True, null=True)  # Field name made lowercase.
    pctfloan = models.TextField(db_column='PCTFLOAN', blank=True, null=True)  # Field name made lowercase.
    ug25abv = models.TextField(db_column='UG25ABV', blank=True, null=True)  # Field name made lowercase.
    cdr3 = models.TextField(db_column='CDR3', blank=True, null=True)  # Field name made lowercase.
    death_yr8_rt = models.TextField(db_column='DEATH_YR8_RT', blank=True, null=True)  # Field name made lowercase.
    comp_orig_yr8_rt = models.TextField(db_column='COMP_ORIG_YR8_RT', blank=True, null=True)  # Field name made lowercase.
    compl_rpy_7yr_rt = models.TextField(db_column='COMPL_RPY_7YR_RT', blank=True, null=True)  # Field name made lowercase.
    noncom_rpy_7yr_rt = models.TextField(db_column='NONCOM_RPY_7YR_RT', blank=True, null=True)  # Field name made lowercase.
    dep_inc_avg = models.TextField(db_column='DEP_INC_AVG', blank=True, null=True)  # Field name made lowercase.
    ind_inc_avg = models.TextField(db_column='IND_INC_AVG', blank=True, null=True)  # Field name made lowercase.
    debt_mdn = models.TextField(db_column='DEBT_MDN', blank=True, null=True)  # Field name made lowercase.
    grad_debt_mdn = models.TextField(db_column='GRAD_DEBT_MDN', blank=True, null=True)  # Field name made lowercase.
    wdraw_debt_mdn = models.TextField(db_column='WDRAW_DEBT_MDN', blank=True, null=True)  # Field name made lowercase.
    lo_inc_debt_mdn = models.TextField(db_column='LO_INC_DEBT_MDN', blank=True, null=True)  # Field name made lowercase.
    hi_inc_debt_mdn = models.TextField(db_column='HI_INC_DEBT_MDN', blank=True, null=True)  # Field name made lowercase.
    dep_debt_mdn = models.TextField(db_column='DEP_DEBT_MDN', blank=True, null=True)  # Field name made lowercase.
    ind_debt_mdn = models.TextField(db_column='IND_DEBT_MDN', blank=True, null=True)  # Field name made lowercase.
    md_earn_wne_p10 = models.TextField(db_column='MD_EARN_WNE_P10', blank=True, null=True)  # Field name made lowercase.
    sd_earn_wne_p10 = models.TextField(db_column='SD_EARN_WNE_P10', blank=True, null=True)  # Field name made lowercase.
    gt_25k_p10 = models.TextField(db_column='GT_25K_P10', blank=True, null=True)  # Field name made lowercase.
    alias = models.TextField(db_column='ALIAS', blank=True, null=True)  # Field name made lowercase.
    ugds_men = models.FloatField(db_column='UGDS_MEN', blank=True, null=True)  # Field name made lowercase.
    ugds_women = models.FloatField(db_column='UGDS_WOMEN', blank=True, null=True)  # Field name made lowercase.
    academicyear = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'CollegeScorecard'