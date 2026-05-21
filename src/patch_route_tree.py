from pathlib import Path

path = Path(r'd:\D-SITES INFOSOLUTIONS\d-sites-infosolutions\src\routeTree.gen.ts')
text = path.read_text(encoding='utf-8')

# Normalize to LF for processing
lf_text = text.replace('\r\n', '\n')

# Import addition
if "import { Route as ContactRouteImport }" not in lf_text:
    lf_text = lf_text.replace(
        "import { Route as IndexRouteImport } from './routes/index'\nimport { Route as ServicesIndexRouteImport }",
        "import { Route as IndexRouteImport } from './routes/index'\nimport { Route as ContactRouteImport } from './routes/contact'\nimport { Route as ServicesIndexRouteImport }")

# Contact route constant
if "const ContactRoute = ContactRouteImport" not in lf_text:
    lf_text = lf_text.replace(
        "} as any)\nconst ServicesIndexRoute = ServicesIndexRouteImport.update({",
        "} as any)\nconst ContactRoute = ContactRouteImport.update({\n  id: '/contact',\n  path: '/contact',\n  getParentRoute: () => rootRouteImport,\n} as any)\nconst ServicesIndexRoute = ServicesIndexRouteImport.update({")

# FileRoutesByFullPath
if "'/contact': typeof ContactRoute" not in lf_text:
    lf_text = lf_text.replace(
        "  '/services/website-maintenance-support': typeof ServicesWebsiteMaintenanceSupportRoute\n  '/services/': typeof ServicesIndexRoute\n}\nexport interface FileRoutesByTo",
        "  '/services/website-maintenance-support': typeof ServicesWebsiteMaintenanceSupportRoute\n  '/contact': typeof ContactRoute\n  '/services/': typeof ServicesIndexRoute\n}\nexport interface FileRoutesByTo")

# FileRoutesByTo
if not lf_text.count("'/contact': typeof ContactRoute") >= 2:
    lf_text = lf_text.replace(
        "  '/services/website-maintenance-support': typeof ServicesWebsiteMaintenanceSupportRoute\n  '/services': typeof ServicesIndexRoute\n}\nexport interface FileRoutesById",
        "  '/services/website-maintenance-support': typeof ServicesWebsiteMaintenanceSupportRoute\n  '/contact': typeof ContactRoute\n  '/services': typeof ServicesIndexRoute\n}\nexport interface FileRoutesById")

# FileRoutesById
if not lf_text.count("'/contact': typeof ContactRoute") >= 3:
    lf_text = lf_text.replace(
        "  '/services/website-maintenance-support': typeof ServicesWebsiteMaintenanceSupportRoute\n  '/services/': typeof ServicesIndexRoute\n}\nexport interface FileRouteTypes",
        "  '/services/website-maintenance-support': typeof ServicesWebsiteMaintenanceSupportRoute\n  '/contact': typeof ContactRoute\n  '/services/': typeof ServicesIndexRoute\n}\nexport interface FileRouteTypes")

# FileRoutesByPath module
if "    '/contact'" not in lf_text:
    lf_text = lf_text.replace(
        "    '/services/branding': {\n      id: '/services/branding'\n      path: '/services/branding'\n      fullPath: '/services/branding'\n      preLoaderRoute: typeof ServicesBrandingRouteImport\n      parentRoute: typeof rootRouteImport\n    }\n  }\n}",
        "    '/services/branding': {\n      id: '/services/branding'\n      path: '/services/branding'\n      fullPath: '/services/branding'\n      preLoaderRoute: typeof ServicesBrandingRouteImport\n      parentRoute: typeof rootRouteImport\n    }\n    '/contact': {\n      id: '/contact'\n      path: '/contact'\n      fullPath: '/contact'\n      preLoaderRoute: typeof ContactRouteImport\n      parentRoute: typeof rootRouteImport\n    }\n  }\n}")

# RootRouteChildren
if "ContactRoute: ContactRoute," not in lf_text:
    lf_text = lf_text.replace(
        "const rootRouteChildren: RootRouteChildren = {\n  IndexRoute: IndexRoute,\n  ServicesBrandingRoute: ServicesBrandingRoute,",
        "const rootRouteChildren: RootRouteChildren = {\n  IndexRoute: IndexRoute,\n  ContactRoute: ContactRoute,\n  ServicesBrandingRoute: ServicesBrandingRoute,")

# Convert back to CRLF
final_text = lf_text.replace('\n', '\r\n')
path.write_text(final_text, encoding='utf-8')
print('done')
