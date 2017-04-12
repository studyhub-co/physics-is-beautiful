from django.shortcuts import render
from blog.models import NcesDb
import pandas as pd
from bokeh.plotting import figure, ColumnDataSource
from bokeh.embed import components
from bokeh.models import HoverTool, CategoricalColorMapper, NumeralTickFormatter

def BlogHomepage(request):
    return render(request, 'blog/blog_homepage.html')

def CollegeScorecard(request):
    return render(request, 'blog/college_scorecard.html')

def Shankar(request):
    return render(request, 'blog/shankar.html')

def graph(request):
    def load_data(years, x_axis, y_axis, selected_sectors, selected_institutions):
        axis_dict = {
            'fte_count': ["Full-time student enrollment"],
            'tuition03': ["Total revenue from tuition and fees", "$"],
            'loan_avg_amount': ["Average loan amount", "$"],
            'tuitionfee01_tf': ["In-district tuition and fees", "$"],
            'tuitionfee02_tf': ["In-state tuition and fees", "$"],
            'tuitionfee03_tf': ["Out-of-state tuition and fees", "$"],
            'inst_grant_avg_amount': ["Institutional grant avg. amount", "$"],
            'inst_grant_pct': ["Institutional grant percentage"],
            'loan_pct': ["Loan percentage"],
            'fed_grant_pct': ["Percentage of students receiving federal grants"],
            'fed_grant_avg_amount': ["Federal grant avg amount", "$"],
            'state_grant_pct': ["State grant percentage"],
            'state_grant_avg_amount': ["State grant avg amount", "$"],
            'research01_fasb': ["Expenditures for research", "$"],
            'gross_operating_margin': ["Net profit", "$"],
            'assets06': ["Total assets", "$"],
            'grad_rate_150_p': ["Graduation rate", "<1"],
            'ptretention_rate': ["Retention rate", "<1"],
            'total_undergraduates': ["Total number of undergraduate students"],
            'total_graduates': ["Total number of graduate students"],
            'total_enrollment': ["Total number of students"],
            'total_enrollment_amin_tot': ["Total american indian enrollment"],
            'total_enrollment_asian_tot': ["Total asian enrollment"],
            'total_enrollment_black_tot': ["Total black enrollment"],
            'total_enrollment_hisp_tot': ["Total hispanic enrollment"],
            'total_enrollment_white_tot': ["Total white enrollment"],
            'total_enrollment_multi_tot': ["Total multi-ethnic enrollment"],
            'total_enrollment_unkn_tot': ["Total unknown race enrollment"],
            'total_enrollment_nonres_tot': ["Total non-resident enrollment"],
            'applcn': ["Total number of applications"],
            'applcnm': ["Number of male applicants"],
            'applcnw': ["Number of female applicants"],
            'admssn': ["Total number admitted"],
            'admssnm': ["Number of males admitted"],
            'admssnw': ["Number of females admitted"],
            'actcm25': ["ACT composite 25th percentile score"],
            'actcm75': ["ACT composite 75th percentile score"],
            'acten25': ["ACT english 25th percentile score"],
            'acten75': ["ACT english 75th percentile score"],
            'actmt25': ["ACT math 25th percentile score"],
            'actmt75': ["ACT math 75th percentile score"],
            'satmt25': ["SAT math 25th percentile score"],
            'satmt75': ["SAT math 75th percentile score"],
            'satvr25': ["SAT critical reading 25th percentile score"],
            'satvr75': ["SAT critical reading 75th percentile score"],
            'ft_faculty_salary': ["Faculty salary"],
            'govt_reliance_c': ["Government reliance", "<1"],
        }
        sectors = ["Administrative unit",
                   "Public 4-year",
                   "Private nonprofit 4-year",
                   "Private for-profit 4-year ",
                   "Public 2-Year",
                   "Private nonprofit 2-year",
                   "Private for-profit 2-year",
                   "Public <2-year",
                   "Private nonprofit <2-year",
                   "Private for-profit <2-year",
                   "Sector unknown",
                   ]
        numbered_selected_sectors = []
        for sector in selected_sectors:
            numbered_selected_sectors.append(sectors.index(sector))
        year_list = map(str, reversed(range(2000,2014)))
        x_filter = x_axis + '__isnull'
        y_filter = y_axis + '__isnull'
        df = pd.DataFrame.from_records(
            NcesDb.objects.all().values('academicyear',
                                        x_axis,
                                        y_axis,
                                        'instname',
                                        'sector_revised',
                                        ).filter(academicyear__in=years
                                                 ).filter(sector_revised__in=numbered_selected_sectors
                                                          ))
        df['sector_revised'] = df['sector_revised'].replace([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 99], sectors)
        source = ColumnDataSource(df)
        source.selected = {
            '0d': {"indices": [0]},
            '1d': {"indices": df[df['instname'].isin(selected_institutions)].index.tolist()},
            '2d': {"indices": [0]}
        }
        # Send the data to the Bokeh plot
        hover = HoverTool(
            tooltips=[
                ("Institution", "@instname"),
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
                   tools=[hover, "save,pan,wheel_zoom,box_zoom,reset,tap"],
                   x_axis_label=axis_dict[x_axis][0] + (" ($)" if "$" in axis_dict[x_axis] else ""),
                   y_axis_label=axis_dict[y_axis][0] + (" ($)" if "$" in axis_dict[y_axis] else ""),
                   title=axis_dict[y_axis][0] + ' vs. ' + axis_dict[x_axis][0] + ' (year ' + ', '.join(
                       str(year) for year in years) + ')',
                   )
        color_mapper = CategoricalColorMapper(palette=['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22'], factors=sectors[1:10])
        p.scatter(x_axis,
                  y_axis,
                  source=source,
                  fill_color={'field': 'sector_revised', 'transform': color_mapper},
                  line_color=None,
                  legend={'field': 'sector_revised'},
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
        form_dict['script'] = script
        form_dict['div'] = div
        form_dict['axis_options'] = axis_dict
        form_dict['selected'] = {
            'years': years,
            'x_axis': x_axis,
            'y_axis': y_axis,
            'sectors':selected_sectors,
            'institutions':selected_institutions,
        }
        form_dict['year_list'] = year_list
        sectors.remove("Administrative unit")
        sectors.remove("Sector unknown")
        form_dict['sector_list'] = sectors
        instnames = pd.DataFrame.from_records(
            NcesDb.objects.all().values('instname').filter(sector_revised__in=numbered_selected_sectors).distinct())
        form_dict['institutions'] = instnames['instname'].tolist()
        return form_dict

    # IF THE USER SELECTS OPTIONS AND PRESSES "SUBMIT"
    if request.method == 'POST':
        years = request.POST.getlist('years')
        if not years:
            years = [2013]
        x_axis = request.POST.get('xaxis')
        y_axis = request.POST.get('yaxis')
        selected_sectors = request.POST.getlist('sectors')
        selected_institutions = request.POST.getlist('institutions')
        form_dict = load_data(years, x_axis, y_axis, selected_sectors,selected_institutions)
        return render(request, 'blog/graph.html', context=form_dict)
    else:
    # Settings for the initial load (GET instead of POST)
        years = ['2013']
        selected_sectors = ["Public 4-year",
                            "Private nonprofit 4-year",
                            "Private for-profit 4-year ",
                            "Public 2-Year",
                            "Private nonprofit 2-year",
                            "Private for-profit 2-year",
                            ]
        x_axis = 'tuitionfee02_tf'
        y_axis = 'ft_faculty_salary'
        selected_institutions = []
        form_dict = load_data(years, x_axis, y_axis, selected_sectors, selected_institutions)
        return render(request, 'blog/graph.html', context=form_dict)