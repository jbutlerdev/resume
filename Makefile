# Resume site + resume PDF
#
# The served resume PDF (public/JeremiahButler.pdf) is rendered from
# latex/resume.tex via tectonic. The React site is built with CRA (npm run build).
#
# Run from the repo root. Targets:
#   make resume-pdf  - rebuild the resume PDF and refresh the served copy
#   make pdf         - alias for resume-pdf (default)
#   make site        - build the React site into build/
#   make deploy      - resume-pdf + site + refresh docs/ (GitHub Pages deploy dir)
#   make hooks       - point git at the versioned .githooks/ directory
#   make all         - deploy

.PHONY: all resume-pdf pdf site deploy hooks clean

all: deploy

resume-pdf:
	cd latex/ && tectonic resume.tex && cd .. && cp latex/resume.pdf public/JeremiahButler.pdf

pdf: resume-pdf

site:
	npm run build

# Full deploy artifact refresh: PDF first (so the site build picks up the
# updated public/JeremiahButler.pdf), then the CRA build, then mirror it
# into docs/ which GitHub Pages serves (CNAME comes from public/).
deploy: resume-pdf site
	rm -rf docs
	cp -r build docs

hooks:
	git config core.hooksPath .githooks
	@echo "git hooks path set to .githooks/"

clean:
	rm -rf build latex/*.aux latex/*.log latex/*.out latex/*.xdv
