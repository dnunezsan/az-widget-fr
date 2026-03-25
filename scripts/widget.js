function cargarWidget(widgetSettings, WidgetHelpers, WorkItemRestClient) {

    // 1. Leer el estado que el usuario eligió en el menú
    var settings = JSON.parse(widgetSettings.customSettings.data || "{}");
    var estadoObjetivo = settings.estado || "Closed";  // default si no hay config

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

                // 2. Calcular porcentaje con el estado recibido
                var total = workItems.length;
                var completadas = workItems.filter(function(wi) {
                    return wi.fields["System.State"] === estadoObjetivo;
                }).length;
                var porcentaje = Math.round((completadas / total) * 100);

                // 3. Renderizar
                $(".title").text("Épicas del proyecto");
                $(".porcentaje").text(
                    completadas + " de " + total + 
                    " épicas en '" + estadoObjetivo + "' → " + porcentaje + "%"
                );

                // var list = $("<ul>");
                // workItems.forEach(function(wi) {
                //     list.append(
                //         $("<li>").text(
                //             "#" + wi.id + " - " + wi.fields["System.Title"] +
                //             " [" + wi.fields["System.State"] + "]"
                //         )
                //     );
                // });
                // $(".content").append(list);

                return WidgetHelpers.WidgetStatusHelper.Success();
            });

    }).then(undefined, function(error) {
        return WidgetHelpers.WidgetStatusHelper.Failure(error.message);
    });
}