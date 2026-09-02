# Resume site + resume PDF
#
# The served resume PDF (public/JeremiahButler.pdf) is rendered from
# latex/resume.tex via tectonic. The React site is built with CRA (npm run build).
#
# Run from the repo root. Targets:
#   make resume-pdf  - rebuild the resume PDF and refresh the served copy
#   make pdf         - alias for resume-pdf (default)
#   make site        - build the React site into build/
#   make all         - resume-pdf + site

.PHONY: all resume-pdf pdf site clean

all: resume-pdf site

resume-pdf:
	cd latex/ && tectonic resume.tex && cd .. && cp latex/resume.pdf public/JeremiahButler.pdf

pdf: resume-pdf

site:
	npm run build

clean:
	rm -rf build latex/*.aux latex/*.log latex/*.out latex/*.xdv
