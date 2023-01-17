from flask_graphql import GraphQLView

from ...static.python.classes.GraphQL.graphql_schema import schema
from . import api_blueprint

api_blueprint.add_url_rule(
    "/graphql",
    view_func=GraphQLView.as_view(
        "graphql", schema=schema.graphql_schema, graphiql=True
    ),
)
