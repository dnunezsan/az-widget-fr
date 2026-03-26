function cargarWidget(widgetSettings, WidgetHelpers, WorkItemRestClient, Highcharts) {

    var settings = JSON.parse(widgetSettings.customSettings.data || "{}");
    var estadoObjetivo = settings.estado || "Closed";

    var context = VSS.getWebContext();
    var client = WorkItemRestClient.getClient();

    var wiql = {
        query: "SELECT [System.Id], [System.Title], [System.State] " +
            "FROM WorkItems " +
            "WHERE [System.TeamProject] = '" + context.project.name + "' " +
            "AND [System.WorkItemType] = 'Epic' " +
            "ORDER BY [System.CreatedDate] DESC"
    };

    return client.queryByWiql(wiql, context.project.id).then(function(result) {
        var ids = result.workItems.map(function(wi) { return wi.id; });

        if (ids.length === 0) {
            $(".title").text("No hay épicas en este proyecto");
            return WidgetHelpers.WidgetStatusHelper.Success();
        }

        return client.getWorkItems(ids, ["System.Id", "System.Title", "System.State"])
            .then(function(workItems) {
                var total = workItems.length;
                var completadas = workItems.filter(function(wi) {
                    return wi.fields["System.State"] === estadoObjetivo;
                }).length;
                var otros = total - completadas;
                var porcentaje = Math.round((completadas / total) * 100);

                // Título encima del gráfico
                $(".title").text("Épicas del proyecto — " + porcentaje + "%  en " + estadoObjetivo);

                // Renderizar torta
                Highcharts.chart("chart-container", {
                    accessibility: { enabled: false },
                    chart: {
                        type: "pie",
                        margin: [0, 0, 0, 0],
                        backgroundColor: "transparent"
                    },
                    title: { text: null },
                    tooltip: {
                        pointFormat: "<b>{point.y} épicas ({point.percentage:.1f}%)</b>"
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: "pointer",
                            dataLabels: {
                                enabled: true,
                                format: "<b>{point.name}</b>: {point.y}"
                            }
                        }
                    },
                    credits: { enabled: false },
                    series: [{
                        name: "Épicas",
                        colorByPoint: true,
                        data: [
                            { name: estadoObjetivo, y: completadas, color: "#107C10" },
                            { name: "Otros",        y: otros,       color: "#D83B01" }
                        ]
                    }]
                });

                return WidgetHelpers.WidgetStatusHelper.Success();
            });

    }).then(undefined, function(error) {
        return WidgetHelpers.WidgetStatusHelper.Failure(error.message);
    });
}