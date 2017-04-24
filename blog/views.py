from django.shortcuts import render
from blog.models import Collegescorecard
from django.http import HttpResponse
import pandas as pd
from bokeh.plotting import figure, ColumnDataSource
from bokeh.embed import components
from bokeh.models import HoverTool, CategoricalColorMapper, NumeralTickFormatter
import numpy as np

def BlogHomepage(request):
    return render(request, 'blog/blog_homepage.html')

def CollegeScorecard(request):
    return render(request, 'blog/collegescorecard-analysis.html')

def Shankar(request):
    return render(request, 'blog/shankar.html')

def CollegeMap(request):
    intensity_variable = 'tuitionfee_in'
    df = pd.DataFrame.from_records(
        Collegescorecard.objects.all().values('latitude','longitude',intensity_variable,
                                              ).filter(academicyear__in=[2014,]
                                                       ))
    df = df.convert_objects(convert_numeric=True)
    df= df.replace('', np.nan).dropna().reset_index(drop=True)
    df[intensity_variable]=df[intensity_variable]/df[intensity_variable].max()
    context={'addressPoints': df.values.tolist() }
    return render(request, 'blog/collegemap.html', context = context)

def CollegeScorecardApp(request):
    def load_data(years, x_axis, y_axis, selected_sectors, selected_institutions):
        # Axis dict provides a mapping of model name slug -> axis label
        # The extra "<1" in some columns represent fields that are less than one, for proper axis handling
        # The "$" is used for columns whose value are in dollars, for proper rendering in the tooltip
        axis_dict = {
            'adm_rate':['Admission rate', "<1"],
            'sat_avg': ['Average SAT equivalent score of students admitted'],
            'satvrmid':['Midpoint of SAT scores at the institution (critical reading)'],
            'satmtmid':['Midpoint of SAT scores at the institution (math)'],
            'satwrmid':['Midpoint of SAT scores at the institution (writing)'],
            'actcmmid':['Midpoint of the ACT cumulative score'],
            'actenmid':['Midpoint of the ACT English score'],
            'actmtmid':['Midpoint of the ACT math score'],
            'actwrmid':['Midpoint of the ACT writing score'],
            'ugds':['Undergraduate enrollment'],
            'ugds_white':['Percent of undergraduates who are white', '<1'],
            'ugds_black':['Percent of undergraduates who are black', '<1'],
            'ugds_hisp':['Percent of undergraduates who are hispanic', '<1'],
            'ugds_asian':['Percent of undergraduates who are asian', '<1'],
            'ugds_aian':['Percent of undergraduates who are American Indian/Alaska Native', '<1'],
            'ugds_nhpi':['Percent of undergraduates who are Native Hawaiian/Pacific Islander', '<1'],
            'ugds_2mor':['Percent of undergraduates who are two or more races','<1'],
            'ugds_nra':['Percent of undergraduates who are non-resident aliens','<1'],
            'ugds_men': ['Percent of undergraduates who are men','<1'],
            'ugds_women': ['Percent of undergraduates who are women','<1'],
            'pptug_ef':['Percent of undergraduates students who are part-time','<1'],
            'costt4_a':['Average cost of attendance'],
            'tuitionfee_in':['In-state tuition and fees', '$'],
            'tuitionfee_out':['Out-of-state tuition and fees','$'],
            'tuitfte':['Net tuition revenue per full-time equivalent student', '$'],
            'inexpfte':['Instructional expenditures per full-time equivalent student', '$'],
            'avgfacsal':['Average faculty salary', '$'],
            'pftfac':['Proportion of faculty that is full-time','<1'],
            'pctpell':['Percentage of undergraduates who receive a Pell Grant','<1'],
            'c150_4':['Completion rate at four-year institutions','<1'],
            'pctfloan':['Percent of all undergraduates receiving a federal student loan','<1'],
            'ug25abv':['Percentage of undergraduates aged 25 and above','<1'],
            'cdr3':['Three-year default rate'],
            'death_yr8_rt':['Percent died within 8 years at original institution','<1'],
            'comp_orig_yr8_rt':['Percent completed within 8 years at original institution','<1'],
            'compl_rpy_7yr_rt':['Seven-year repayment rate for completers'],
            'noncom_rpy_7yr_rt':['Seven-year repayment rate for non-completers'],
            'dep_inc_avg':['Average family income of dependent students in real 2015 dollars','$'],
            'ind_inc_avg':['Average family income of independent students in real 2015 dollars','$'],
            'debt_mdn':['Median debt upon entering repayment','$'],
            'grad_debt_mdn':['Median debt for students who have completed','$'],
            'wdraw_debt_mdn':['Median debt for students who have withdrawn','$'],
            'lo_inc_debt_mdn':['Median debt for students with family income between $0-$30,000'],
            'hi_inc_debt_mdn':['Median debt for students with family income $75,001+'],
            'dep_debt_mdn':['Median debt for dependent students'],
            'ind_debt_mdn':['Median debt for independent students'],
            'md_earn_wne_p10':['Median earnings of students 10 years after entry'],
            'sd_earn_wne_p10':['Standard deviation of earnings of students 10 years after entry'],
            'gt_25k_p10':['Percent of students earning over $25,000/year 10 years after entry','<1',],
            #'alias':['Institution alias'],
            #'academicyear':['Year'],
            # 'unitid': ['Institution ID'],
            # 'instnm': ['Institution name'],
            # 'city': ['City'],
            # 'stabbr':['State'],
            # 'zip':['Zip code'],
            # 'accredagency':['Accreditation agency'],
            # 'insturl':['Institution URL'],
            # 'npcurl':["URL for institution's net price calculator"],
            # 'sch_deg':['Predominant degree awarded'],
            # 'hcm2':['Schools that are on Heightened Cash Monitoring 2 by the Department of Education'],
            # 'main':['Flag for main campus'],
            # 'numbranch':['Number of branch campuses'],
            # 'preddeg':['Predominant undergraduate degree awarded'],
            # 'highdeg':['Highest degree awarded'],
            # 'control':['Control of institution'],
            # 'region':['Region'],
            # 'locale':['Locale'],
            # 'latitude':['Latitude'],
            # 'longitude':['Longitude'],
            # 'ccbasic':['Carnegie Classification -- basic'],
            # 'ccugprof':['Carnegie Classification -- undergraduate profile'],
            # 'ccsizset':['Carnegie Classification -- size and setting'],
            # 'hbcu':['Historically Black College and University'],
            # 'pbi':['Predominantly black institution'],
            # 'annhi':['Alaska Native Native Hawaiian serving institution'],
            # 'tribal':['Tribal college and university'],
            # 'aanapii':['Asian American Native American Pacific Islander-serving institution'],
            # 'hsi':['Hispanic-serving institution'],
            # 'nanti':['Native American non-tribal institution'],
            # 'menonlyv':['Men-only college'],
            # 'womenonly':['Women-only college'],
            # 'relaffil':['Religious affiliation'],
            # 'curroper':['Currently operating'],
            # 'npt4_pub':['Average net price for Title IV institutions (public institutions)'],
            # 'npt4_priv':['Average net price for Title IV institutions (private for-profit and nonprofit institutions)'],
            # 'npt41_pub':['Average net price for $0-$30,000 family income (public institutions)'],
            # 'npt45_pub':['Average net price for $110,000+ family income (public institutions)'],
            # 'npt41_priv':['Average net price for $0-$30,000 family income (private institutions)'],
            # 'npt45_priv':['Average net price for $110,000+ family income (private institutions)'],
            # 'npt4_048_pub':['Average net price for $0-$48,000 family income (public institutions)'],
            # 'npt4_048_priv':['Average net price for $0-$48,000 family income (private institutions)'],
            # 'num4_pub':['Number of Title IV students (public institutions)'],
            # 'num4_priv':['Number of Title IV students (private institutions)'],
            # 'num41_pub':['Number of Title IV students, $0-$30,000 family income (public institutions)'],
            # 'num45_pub':['Number of Title IV students, $110,000+ family income (public institutions)'],
            # 'num41_priv':['Number of Title IV students, $0-$30,000 family income (private institutions)'],
            # 'num45_priv':['Number of Title IV students, $110,000+ family income (private institutions)'],
            # 'c150_l4':['Completion rate at less-than-four-year institutions'],
            # 'ret_ft4':['Full-time retention rate at four-year institutions'],
            # 'ret_ftl4':['Full-time retention rate at less-than-four-year institutions'],
            # 'ret_pt4':['Part-time student retention rate at four-year institutions'],
            # 'ret_ptl4':['Part-time student retention rate at less-than-four-year institutions'],
            # 'costt4_p':['Average cost of attendance (program-year institutions)'],
        }
        sectors = ["Public 2-Year",
                   "Public 4-year",
                   "Private nonprofit 2-year",
                   "Private nonprofit 4-year",
                   "Private for-profit 2-year",
                   "Private for-profit 4-year",
                   ]
        year_list = map(str, reversed(range(1996,2015)))
        # Query database for data, and read it into a pandas dataframe
        df = pd.DataFrame.from_records(
            Collegescorecard.objects.all().values('academicyear',
                                                  x_axis,
                                                  y_axis,
                                                  'instnm',
                                                  'control',
                                                  'preddeg',
                                                  ).filter(academicyear__in=years
                                                           ).filter(control__in=[1,2,3]
                                                                    ).filter(preddeg__in=[2,3])
        )
        # Define a new column in the dataframe called "sector" that combines the control and preddeg columns
        df['sector'] = (df['control'].map(str) + df['preddeg'].map(str)).map(int)
        # Replace the values in the sector column with their string sector name
        df['sector'] = df['sector'].replace([12, 13, 22, 23, 32, 33], sectors)
        # Filter the dataframe for only the selected_sectors (that the user has selected)
        df = df[df['sector'].isin(selected_sectors)]
        # Drop any N/A rows from the dataframe so that they aren't sent to the Bokeh graph
        df = df.replace('', np.nan).dropna().reset_index(drop=True)
        if 'avgfacsal' in df:
            df['avgfacsal']= pd.to_numeric(df['avgfacsal'])*9.5
        if 'death_yr8_rt' in df:
            df['death_yr8_rt']= pd.to_numeric(df['death_yr8_rt'],errors='coerce')*100
        source = ColumnDataSource(df)
        # Find indices of the universities the user has selected in the Chosen autofill box
        selected_institutions_indices = df[df['instnm'].isin(selected_institutions)].index.tolist()
        # Special Bokeh syntax for highlighting certain indices
        source.selected = {
            '0d': {"indices": [0]},
            '1d': {"indices": selected_institutions_indices},
            '2d': {"indices": [0]}
        }
        # Send the data to the Bokeh plot
        hover = HoverTool(
            tooltips=[
                ("Institution", "@instnm"),
                (axis_dict[x_axis][0], (" $" if "$" in axis_dict[x_axis] else " ") + "@" + x_axis + (
                    "{0.2a}" if "<1" in axis_dict[x_axis] else "{0a}")),
                (axis_dict[y_axis][0], (" $" if "$" in axis_dict[y_axis] else " ") + "@" + y_axis + (
                    "{0.2a}" if "<1" in axis_dict[y_axis] else "{0a}")),
                ("Year", "@academicyear"),
            ]
        )
        p = figure(plot_width=800,
                   #x_range=(-650, 65000),
                   #y_range=(-2500, 250000),
                   sizing_mode='scale_both',
                   tools=[hover, "save,pan,wheel_zoom,box_zoom,reset,tap"],
                   x_axis_label=axis_dict[x_axis][0] + (" ($)" if "$" in axis_dict[x_axis] else ""),
                   y_axis_label=axis_dict[y_axis][0] + (" ($)" if "$" in axis_dict[y_axis] else ""),
                   title=axis_dict[y_axis][0] + ' vs. ' + axis_dict[x_axis][0] + ' (year ' + ', '.join(
                       str(year) for year in years) + ')',
                   )
        color_mapper = CategoricalColorMapper(
            palette=['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', ], factors=[
                "Public 4-year",
                "Private nonprofit 4-year",
                "Public 2-Year",
                "Private for-profit 2-year",
                "Private nonprofit 2-year",
                "Private for-profit 4-year",
            ])
        p.scatter(x_axis,
                  y_axis,
                  source=source,
                  fill_color={'field': 'sector', 'transform': color_mapper},
                  line_color=None,
                  legend={'field': 'sector'},
                  nonselection_fill_color="grey",
                  nonselection_fill_alpha=0.1,
                  nonselection_line_alpha=0,
                  )
        p.legend.background_fill_alpha = 0
        p.legend.border_line_alpha = 0
        p.toolbar.logo = None
        p.toolbar.active_drag = None
        p.yaxis.formatter = NumeralTickFormatter(format=("0.2a" if "<1" in axis_dict[y_axis] else "3a"))
        p.xaxis.formatter = NumeralTickFormatter(format=("0.2a" if "<1" in axis_dict[x_axis] else "3a"))

        script, div = components(p)
        form_dict = {}
        if not df.empty:
            form_dict['div'] = div
            form_dict['script'] = script
        else:
            form_dict['div'] = 'No data available for your query'
            form_dict['script'] = ''
        form_dict['axis_options'] = axis_dict
        form_dict['selected'] = {
            'years': years,
            'x_axis': x_axis,
            'y_axis': y_axis,
            'sectors':selected_sectors,
            'institutions':selected_institutions,
        }
        form_dict['year_list'] = year_list
        form_dict['sector_list'] = sectors
        instnames = pd.DataFrame.from_records(
            Collegescorecard.objects.all().values('instnm').filter(control__in=[1,2,3]
                                                                   ).filter(preddeg__in=[2,3]
                                                                            ).distinct())
        form_dict['institutions'] = instnames['instnm'].tolist()
        return form_dict

    # IF THE USER SELECTS OPTIONS AND PRESSES "SUBMIT"
    if request.method == 'POST':
        years = request.POST.getlist('years')
        if not years:
            years = [2014]
        x_axis = request.POST.get('xaxis')
        y_axis = request.POST.get('yaxis')
        selected_sectors = request.POST.getlist('sectors')
        selected_institutions = request.POST.getlist('institutions')
        form_dict = load_data(years, x_axis, y_axis, selected_sectors,selected_institutions)
        return render(request, 'blog/collegescorecard.html', context=form_dict)
    else:
        # Settings for the initial load (GET instead of POST)
        years = ['2014']
        selected_sectors = ["Public 4-year",
                            "Private nonprofit 4-year",
                            "Private for-profit 4-year",
                            "Public 2-Year",
                            "Private nonprofit 2-year",
                            "Private for-profit 2-year",
                            ]
        x_axis = 'tuitionfee_in'
        y_axis = 'avgfacsal'
        selected_institutions = []
        form_dict = load_data(years, x_axis, y_axis, selected_sectors, selected_institutions)
        return render(request, 'blog/collegescorecard.html', context=form_dict)