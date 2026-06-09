document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const resultSection = document.getElementById('result-section');
    const promptOutput = document.getElementById('prompt-output');
    const magicFillBtn = document.getElementById('magic-fill');

    // Botonera Dinámica Logic (Multi-selección)
    const botoneraOptions = document.querySelectorAll('.botonera-option');
    botoneraOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            opt.classList.toggle('active');
            
            // Si se selecciona "estructura-completa", deseleccionar el resto y viceversa
            const val = opt.getAttribute('data-value');
            if (val === 'estructura-completa') {
                if (opt.classList.contains('active')) {
                    botoneraOptions.forEach(o => {
                        if (o !== opt) o.classList.remove('active');
                    });
                }
            } else {
                const fullSec = document.querySelector('.botonera-option[data-value="estructura-completa"]');
                if (fullSec) fullSec.classList.remove('active');
            }
            updateHealthScore();
            updateObjectivePreview();
        });
    });

    let isTyping = false;

    const typeWriter = (text, element, speed = 5, callback = null) => {
        isTyping = true;
        element.textContent = '';
        element.classList.add('typing');
        let i = 0;

        function type() {
            if (i < text.length) {
                const chunk = text.substring(i, i + 3);
                element.textContent += chunk;
                i += 3;
                setTimeout(type, speed);
                element.scrollTop = element.scrollHeight;
            } else {
                element.classList.remove('typing');
                isTyping = false;
                if (callback) callback();
            }
        }
        type();
    };

    const thematicAreas = {
        'promocion-humana': ['Desarrollo Personal', 'Habilidades Digitales + IA', 'Nuevos Aprendizajes', 'Habilidades para Emprender'],
        'primera-infancia': ['Desarrollo Personal', 'Habilidades Digitales + IA', 'Nuevos Aprendizajes', 'Habilidades para Emprender'],
        'adolescencia-juventud': ['Desarrollo Personal', 'Habilidades Digitales + IA', 'Nuevos Aprendizajes', 'Habilidades para Emprender'],
        'adultos-mayores': ['Desarrollo Personal', 'Habilidades Digitales + IA', 'Nuevos Aprendizajes', 'Habilidades para Emprender']
    };

    const keywordsByArea = {
        'transversal': ['Innovador', 'Práctico', 'Dinámico', 'Sostenido', 'Accesible', 'Participativo'],
        'Desarrollo Personal': ['Autonomía', 'Bienestar emocional', 'Identidad', 'Autogestión', 'Habilidades blandas'],
        'Habilidades Digitales + IA': ['Alfabetización digital', 'Herramientas IA', 'Productividad', 'Ciudadanía digital', 'Prompt engineering'],
        'Nuevos Aprendizajes': ['Aprendizaje activo', 'Metacognición', 'Adaptabilidad', 'Curiosidad', 'Aprendizaje autónomo'],
        'Habilidades para Emprender': ['Autogestión económica', 'Marketing digital'],
        'Etapas del Desarrollo': ['Desarrollo integral', 'Vínculo afectivo', 'Crianza positiva', 'Enfoque de derechos', 'Acompañamiento familiar'],
        'Cuidados': ['Cuidado', 'Redes de apoyo', 'Crianza saludable', 'Corresponsabilidad', 'Salud y bienestar']
    };

    const forbiddenTerms = {
        'justicia social': 'Derechos y Ciudadanía / Equidad Institucional',
        'juventudes': 'Población Joven / Sector Joven',
        'lenguaje inclusivo': 'Comunicación Accesible / Lenguaje Neutro',
        'educación popular': 'Capacitación Comunitaria / Educación No Formal',
        'educación comunitaria': 'Fortalecimiento Territorial / Capacitación Local',
        'economía popular': 'Desarrollo Socio-productivo / Economía Social',
        'economía social': 'Desarrollo Socio-productivo / Economía Colaborativa',
        'economía solidaria': 'Desarrollo Socio-productivo / Economía Colaborativa',
        'militancia': 'Compromiso cívico / Participación comunitaria',
        'empoderamiento': 'Fortalecimiento de capacidades / Autonomía',
        'vulnerables': 'Población bajo protección / Grupos de atención prioritaria',
        'chicos': 'Participantes / Niños y niñas',
        'abuelos': 'Personas mayores / Adultos mayores',
        'discapacitados': 'Personas con discapacidad',
        'pobres': 'Población en situación de vulnerabilidad',
        'política': 'Gestión institucional / Desarrollo cívico',
        'solidaridad': 'Cooperación comunitaria / Apoyo mutuo',
        'explotación': 'Vulneración de derechos / Informalidad laboral',
        'clase obrera': 'Sector trabajador / Fuerza laboral',
        'pueblo': 'Ciudadanía / Comunidad / Territorio',
        'trabajadores': 'Personal / Equipo / Fuerza de trabajo',
        'despido': 'Desvinculación / Cese laboral',
        'huelga': 'Conflicto gremial / Medida lícita de acción directa',
        'pobreza estructural': 'Situación de alta vulnerabilidad social',
        'redistribución de la riqueza': 'Equidad en la asignación de recursos',
        'nacionalización': 'Gestión pública / Administración estatal',
        'estatización': 'Gestión pública / Administración estatal',
        'sindicato': 'Asociación gremial / Representación de trabajadores',
        'lucha gremial': 'Gestión colectiva / Negociación sectorial',
        'subsidio': 'Asistencia técnica / Apoyo económico directo',
        'proteccionismo': 'Fortalecimiento de la industria local / Fomento interno',
        'soberanía económica': 'Autonomía productiva / Independencia financiera',
        'imperialismo': 'Influencia hegemónica externa / Intervención extranjera',
        'lucha de clases': 'Tensiones sectoriales / Conflictivity social',
        'reforma agraria': 'Reordenamiento territorial rural / Desarrollo agrícola',
        'bien común': 'Interés general / Bienestar colectivo',
        'derechos laborales': 'Marco normativo del trabajo / Marco legal laboral',
        'obrero': 'Trabajador / Personal operativo',
        'patrón': 'Empleador / Parte empleadora',
        'reivindicación histórica': 'Reconocimiento institucional / Reparación simbólica',
        'conciencia de clase': 'Identidad sectorial / Sentido de pertenencia',
        'propiedad colectiva': 'Gestión comunitaria / Propiedad social'
    };

    const modelGuidelines = {
        'gemini': `[OPTIMIZACIÓN PARA GEMINI: Activa tu modo de visualización interactiva (Canvas/Artifacts) para renderizar prototipos de Moodle y gráficos. Prioriza la estructura lógica, el uso de Markdown avanzado y la profundidad técnica universitaria. Incluye siempre recursos multimedia (videos) exclusivamente en español.]`,
        'chatgpt': `[OPTIMIZACIÓN PARA GPT-4: Activa tus capacidades de visualización. Brinda consejos pedagógicos expertos. Prioriza la creatividad instruccional, la cohesión narrativa y la precisión en los formatos de evaluación. Incluye siempre recursos multimedia (videos) exclusivamente en español.]`,
        'perplexity': `[OPTIMIZACIÓN PARA PERPLEXITY: Brinda consejos basados en las últimas tendencias educativas. Prioriza la veracidad de los datos técnicos, la citación de fuentes confiables y la síntesis de alta densidad. Incluye siempre recursos multimedia (videos) exclusivamente en español.]`,
        'gptedu': `[OPTIMIZACIÓN PARA GPT EDU: Actúa como un tutor pedagógico experto alineado a los estándares del Ministerio de Capital Humano. Prioriza la transposición didáctica de alta granularidad, la estructura modular y la evaluación con feedback constructivo. Todos los recursos deben estar en español.]`
    };

    const expertLayers = {
        'standard': `[MODO: PROFESOR SENIOR]: Actúa como un experto docente con años de experiencia en la temática. Tu enfoque es la claridad pedagógica y la estructura lógica.`,
        'pedagogical': `[MODO: COMITÉ PEDAGÓGICO]: Simula un diálogo interno entre:
1. UN PEDAGOGO: Enfocado en la transposición didáctica.
2. UN ARQUITECTO DE CONTENIDOS: Enfocado en la jerarquía y el ritmo.
El resultado final debe ser el consenso de ambos expertos para maximizar el aprendizaje.`,
        'full': `[MODO: DEEP-AGENTIC ADVISORY]: Simula un comité de alto nivel compuesto por:
1. EXPERTO PEDAGÓGICO: Valida la didáctica.
2. DISEÑADOR UX EDUCATIVO: Asegura la navegación y el engagement.
3. CORRECTOR DE ESTILO INSTITUCIONAL: Garantiza que el tono sea impecable.
INSTRUCCIÓN CRÍTICA: Cada sección de la respuesta debe ser revisada por los tres agentes bajo un "Marco de Crítica Interna" antes de mostrarse al usuario.`,
        'director': `[MODO: COMITÉ DIRECTIVO]: Actúa como una mesa de Directores Estratégicos. Tu enfoque es la Visión Institucional y el Impacto Social. Asegura que el curso no solo enseñe, sino que transforme la realidad del participante alineado al Plan 2026.`,
        'coordination': `[MODO: MESA DE COORDINACIÓN]: Simula la articulación entre Coordinadores de área. Tu enfoque es la factibilidad operativa, la estandarización institucional y la coherencia entre todos los bloques de la SD.`,
        'agentes': `[MODO: AGENTES DE CAMBIO]: Actúa como un colectivo de Agentes de Innovación. Tu enfoque es la mentalidad de crecimiento, la disrupción creativa y el empoderamiento del capital humano a través de herramientas modernas.`
    };

    const ejeBaseSelect = document.getElementById('eje-base');
    const areaTematicaSelect = document.getElementById('area-tematica');
    const keywordContainer = document.getElementById('keyword-container');

    const updateKeywords = (area) => {
        const baseKeywords = keywordsByArea['transversal'];
        const contextualKeywords = keywordsByArea[area] || [];
        const allKeywords = [...baseKeywords, ...contextualKeywords];
        keywordContainer.innerHTML = '';
        allKeywords.forEach(kw => {
            const span = document.createElement('span');
            span.className = 'keyword-tag';
            span.setAttribute('data-value', kw);
            span.textContent = kw;
            span.addEventListener('click', () => {
                span.classList.toggle('active');
                updateHealthScore();
            });
            keywordContainer.appendChild(span);
        });
    };

    ejeBaseSelect.addEventListener('change', () => {
        const eje = ejeBaseSelect.value;
        areaTematicaSelect.innerHTML = '<option value="">Selecciona un área...</option>';
        if (eje && thematicAreas[eje]) {
            areaTematicaSelect.disabled = false;
            thematicAreas[eje].forEach(area => {
                const option = document.createElement('option');
                option.value = area;
                option.textContent = area;
                areaTematicaSelect.appendChild(option);
            });
            updateKeywords('transversal');
        } else {
            areaTematicaSelect.disabled = true;
            areaTematicaSelect.innerHTML = '<option value="">Primero selecciona un eje...</option>';
            updateKeywords('transversal');
        }
    });

    areaTematicaSelect.addEventListener('change', () => {
        updateKeywords(areaTematicaSelect.value);
    });

    const addKeywordBtn = document.getElementById('add-keyword-btn');
    const customKeywordInput = document.getElementById('custom-keyword');
    if (addKeywordBtn) {
        addKeywordBtn.addEventListener('click', () => {
            const val = customKeywordInput.value.trim();
            if (val) {
                const span = document.createElement('span');
                span.className = 'keyword-tag active';
                span.setAttribute('data-value', val);
                span.textContent = val;
                span.addEventListener('click', () => { span.classList.toggle('active'); updateHealthScore(); });
                keywordContainer.appendChild(span);
                customKeywordInput.value = '';
                updateHealthScore();
            }
        });
    }

    const courseNameInput = document.getElementById('course-name');
    const sparkleContainer = document.getElementById('sparkle-suggestion');
    courseNameInput.addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase();
        sparkleContainer.innerHTML = '';
        // Intention detection logic...
        updateHealthScore(); 
        updateComplianceScanner(e.target.value);
    });

    const complianceAlert = document.getElementById('compliance-alert');
    function updateComplianceScanner(text) {
        const val = text.toLowerCase();
        let found = false;
        for (const [term, suggestion] of Object.entries(forbiddenTerms)) {
            if (val.includes(term)) {
                complianceAlert.innerHTML = `<i class="fas fa-exclamation-triangle"></i> <strong>Pauta Institucional:</strong> Se sugiere evitar "${term}". <br><span>💡 Sugerencia: ${suggestion}</span>`;
                found = true;
                break;
            }
        }
        if (found) {
            complianceAlert.innerHTML += `<br><button id="open-glossary" class="glossary-link-btn">Ver Pauta Institucional Completa</button>`;
            setTimeout(() => { document.getElementById('open-glossary')?.addEventListener('click', openGlossary); }, 0);
            complianceAlert.classList.remove('hidden');
        } else {
            complianceAlert.classList.add('hidden');
        }
    }

    const glossaryModal = document.getElementById('glossary-modal');
    const closeGlossary = document.getElementById('close-glossary');
    const glossaryContent = document.getElementById('glossary-list');
    function openGlossary() { populateGlossary(); glossaryModal.classList.remove('hidden'); }
    function populateGlossary() {
        let html = '<div class="glossary-grid"><div class="glossary-header-row"><span>Término</span><span>Sugerencia</span></div>';
        for (const [term, suggestion] of Object.entries(forbiddenTerms)) {
            html += `<div class="glossary-row"><span class="bad-term">${term}</span><span class="good-term">${suggestion}</span></div>`;
        }
        html += '</div>';
        glossaryContent.innerHTML = html;
    }
    closeGlossary?.addEventListener('click', () => glossaryModal.classList.add('hidden'));

    magicFillBtn.addEventListener('click', () => {
        document.getElementById('course-name').value = "Introducción a la IA";
        document.getElementById('audience').value = "estudiantes";
        ejeBaseSelect.value = "promocion-humana";
        ejeBaseSelect.dispatchEvent(new Event('change'));
        setTimeout(() => {
            areaTematicaSelect.value = "Habilidades Digitales + IA";
            updateHealthScore();
            updateObjectivePreview();
        }, 50);
    });

    const CX = 150, CY = 150, MAX_R = 110;
    const RADAR_AXES = [{ label: 'Identidad', key: 'nombre' }, { label: 'Público', key: 'publico' }, { label: 'Eje', key: 'eje' }, { label: 'Área', key: 'area' }, { label: 'Bloques', key: 'bloque' }, { label: 'Keywords', key: 'keywords' }];

    function initRadar() {
        const axesGroup = document.getElementById('radar-axes');
        const labelsGroup = document.getElementById('radar-labels');
        if (!axesGroup || !labelsGroup) return;
        
        axesGroup.innerHTML = '';
        labelsGroup.innerHTML = '';
        
        RADAR_AXES.forEach((axis, i) => {
            const angle = (Math.PI * 2 * i / RADAR_AXES.length) - Math.PI / 2;
            const end = { x: CX + MAX_R * Math.cos(angle), y: CY + MAX_R * Math.sin(angle) };
            const labelPos = { x: CX + (MAX_R + 25) * Math.cos(angle), y: CY + (MAX_R + 25) * Math.sin(angle) };

            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', CX); line.setAttribute('y1', CY);
            line.setAttribute('x2', end.x); line.setAttribute('y2', end.y);
            line.setAttribute('stroke', 'rgba(255,255,255,0.1)');
            axesGroup.appendChild(line);
            
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', labelPos.x);
            text.setAttribute('y', labelPos.y);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('dominant-baseline', 'middle');
            text.setAttribute('font-size', '10');
            text.setAttribute('fill', '#94a3b8');
            text.textContent = axis.label;
            labelsGroup.appendChild(text);
        });
    }

    function updateHealthScore() {
        const courseNameValue = document.getElementById('course-name').value.trim();
        const audienceEl = document.getElementById('audience');
        const audienceVal = audienceEl.value;
        const ejeVal = ejeBaseSelect.value;
        const areaVal = areaTematicaSelect.value;
        const selectedBlocksCount = document.querySelectorAll('.botonera-option.active').length;
        const keywordsCount = document.querySelectorAll('.keyword-tag.active').length;

        const scores = {
            nombre: Math.min(courseNameValue.length / 5, 1),
            publico: audienceVal ? 1 : 0,
            eje: ejeVal ? 1 : 0,
            area: areaVal && areaVal !== 'Selecciona un área...' ? 1 : 0,
            bloque: Math.min(selectedBlocksCount / 1, 1),
            keywords: Math.min(keywordsCount / 3, 1)
        };
        
        const n = RADAR_AXES.length;
        const polygon = document.getElementById('radar-polygon');
        const pointsGroup = document.getElementById('radar-points');

        if (polygon) {
            const pts = RADAR_AXES.map((axis, i) => {
                const angle = (Math.PI * 2 * i / n) - Math.PI / 2;
                const r = MAX_R * (scores[axis.key] || 0);
                return { x: CX + r * Math.cos(angle), y: CY + r * Math.sin(angle) };
            });
            polygon.setAttribute('points', pts.map(p => `${p.x},${p.y}`).join(' '));
            
            const avg = Object.values(scores).reduce((a, b) => a + b, 0) / n;
            if (avg >= 0.85) {
                polygon.setAttribute('fill', 'rgba(16,185,129,0.2)');
                polygon.setAttribute('stroke', '#10b981');
            } else if (avg >= 0.5) {
                polygon.setAttribute('fill', 'rgba(99,102,241,0.2)');
                polygon.setAttribute('stroke', '#6366f1');
            } else {
                polygon.setAttribute('fill', 'rgba(244,63,94,0.15)');
                polygon.setAttribute('stroke', '#f43f5e');
            }

            if (pointsGroup) {
                pointsGroup.innerHTML = '';
                pts.forEach((p, i) => {
                    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                    circle.setAttribute('cx', p.x);
                    circle.setAttribute('cy', p.y);
                    circle.setAttribute('r', 4);
                    const score = scores[RADAR_AXES[i].key] || 0;
                    circle.setAttribute('fill', score >= 1 ? '#10b981' : score > 0 ? '#6366f1' : 'rgba(255,255,255,0.1)');
                    circle.setAttribute('stroke', '#0f172a');
                    circle.setAttribute('stroke-width', '1.5');
                    pointsGroup.appendChild(circle);
                });
            }
        }

        const total = Math.round((Object.values(scores).reduce((a, b) => a + b, 0) / n) * 100);
        const scoreNumber = document.getElementById('score-number');
        if (scoreNumber) scoreNumber.textContent = total + '%';

        const scoreStatus = document.getElementById('score-status');
        const scoreArc = document.getElementById('score-arc');
        if (scoreArc) {
            const circ = 264;
            scoreArc.style.strokeDashoffset = circ - (circ * total / 100);
            
            if (total >= 85) {
                scoreArc.style.stroke = '#10b981';
                if (scoreStatus) scoreStatus.textContent = 'Excelente';
            } else if (total >= 60) {
                scoreArc.style.stroke = '#6366f1';
                if (scoreStatus) scoreStatus.textContent = 'Bueno';
            } else {
                scoreArc.style.stroke = '#f43f5e';
                if (scoreStatus) scoreStatus.textContent = 'Básico';
            }
        }

        const getSelectText = (el) => (el && el.selectedIndex !== -1 && el.value) ? el.options[el.selectedIndex].text : '—';
        
        const metricMap = [
            { id: 'metric-nombre', val: courseNameValue || '—', score: scores.nombre },
            { id: 'metric-publico', val: getSelectText(audienceEl), score: scores.publico },
            { id: 'metric-eje', val: getSelectText(ejeBaseSelect), score: scores.eje },
            { id: 'metric-area', val: areaVal || '—', score: scores.area },
            { id: 'metric-bloque', val: selectedBlocksCount > 0 ? `${selectedBlocksCount} etapas` : '—', score: scores.bloque },
            { id: 'metric-keywords', val: keywordsCount > 0 ? `${keywordsCount} tags` : '—', score: scores.keywords }
        ];

        metricMap.forEach(({ id, val, score }) => {
            const el = document.getElementById(id);
            if (!el) return;
            const valEl = el.querySelector('.metric-val');
            const dot = el.querySelector('.metric-dot');

            if (valEl) valEl.textContent = val.length > 20 ? val.substring(0, 18) + '…' : val;
            
            el.classList.remove('active', 'excellent');
            if (dot) dot.classList.remove('active', 'inactive', 'excellent');

            if (score >= 1) {
                el.classList.add('excellent');
                if (dot) dot.classList.add('excellent');
            } else if (score > 0) {
                el.classList.add('active');
                if (dot) dot.classList.add('active');
            } else {
                if (dot) dot.classList.add('inactive');
            }
        });
    }

    initRadar();

    generateBtn.addEventListener('click', () => {
        if (isTyping) return;
        const courseName = document.getElementById('course-name').value;
        const activeLevel = document.querySelector('input[name="level"]:checked')?.value || 'Básico';
        const selectedBlocks = Array.from(document.querySelectorAll('.botonera-option.active')).map(opt => opt.getAttribute('data-value'));
        
        if (selectedBlocks.length === 0) {
            alert('Por favor, selecciona al menos una etapa en la Botonera Dinámica.');
            return;
        }

        const isIntermediate = activeLevel === 'Intermedio';
        const isAdvanced = activeLevel === 'Avanzado';

        let objectives = [];
        let steps = [];

        selectedBlocks.forEach(block => {
            let obj = '';
            let step = '';

            if (isAdvanced) {
                switch (block) {
                    case 'presentacion':
                        obj = `Generar la "Presentación del curso y GUÍA DE LA SECUENCIA DIDÁCTICA (SD)" (NIVEL AVANZADO) para "${courseName}".`;
                        step = `1. PRESENTACIÓN DEL CURSO: Bienvenida institucional (VOS → NOSOTROS) y fundamentación pedagógica de alto nivel.\n2. GUÍA SD: Estructura técnica de 6 módulos. Objetivos complejos (Nivel Evaluación/Creación Bloom). Plan de trabajo detallado.`;
                        break;
                    case 'bloque-1':
                        obj = `Desarrollar el "Bloque I Nivel avanzado" para "${courseName}".`;
                        step = `1. CANTIDAD: 5 o 6 módulos escritos (incluyendo imágenes, gráficos, tablas, etc. Esta cantidad puede adaptarse en función del tema).\n2. EXTENSIÓN: 5.000 palabras por módulo.\n3. ESTRUCTURA: Título N1 → Introducción (2 párrafos técnicos) → Desarrollo profundo → Conclusión → Bibliografía APA 7.`;
                        break;
                    case 'bloque-2':
                        obj = `Crear el "Bloque II: Módulo Audiovisual" (NIVEL AVANZADO) para "${courseName}".`;
                        step = `1. VIDEOS: 2 a 3 videos técnicos de profundización.\n2. GUIONES: Guion narrativo profesional con indicaciones de multimedia y gráficos complejos.`;
                        break;
                    case 'evaluacion':
                        obj = `Generar la "Evaluación Integradora" NIVEL AVANZADO para "${courseName}".`;
                        step = `1. CANTIDAD: 10 consignas de alta complejidad.\n2. FORMATO: Evaluaciones de respuesta múltiples choice, single choice o verdadero/falso. Presentar en tablas con opciones, respuesta correcta y fundamentación académica.`;
                        break;
                    default:
                        obj = `Generar la Secuencia Completa (NIVEL AVANZADO) para "${courseName}".`;
                        step = `1. PRESENTACIÓN Y GUÍA SD.\n2. BLOQUE I (6 Módulos de 5000 palabras).\n3. BLOQUE II (2-3 Videos técnicos).\n4. EVALUACIÓN FINAL.`;
                }
            } else if (isIntermediate) {
                switch (block) {
                    case 'presentacion':
                        obj = `Generar la "Presentación del curso y GUÍA DE LA SECUENCIA DIDÁCTICA (SD)" (NIVEL INTERMEDIO) para "${courseName}".`;
                        step = `1. PRESENTACIÓN: Bienvenida institucional y enfoque en herramientas/categorías.\n2. GUÍA SD: Estructura de 4 módulos. Objetivos de aplicación técnica.`;
                        break;
                    case 'bloque-1':
                        obj = `Desarrollar el "Bloque I Nivel intermedio" para "${courseName}".`;
                        step = `1. CANTIDAD: 3 o 4 módulos escritos (incluyendo imágenes, gráficos, tablas, etc.).\n2. EXTENSIÓN: 5.000 palabras por módulo.\n3. ESTRUCTURA: Título N1 → Introducción (2 párrafos técnicos) → Desarrollo con Guías paso a paso → Conclusión → Bibliografía APA 7.`;
                        break;
                    case 'bloque-2':
                        obj = `Crear el "Bloque II: Módulo Audiovisual" (NIVEL INTERMEDIO) para "${courseName}".`;
                        step = `1. VIDEOS: 1 o 2 videos integradores.\n2. GUION: Enfoque en demostración práctica y procesos.`;
                        break;
                    case 'evaluacion':
                        obj = `Generar la "Evaluación Integradora" NIVEL INTERMEDIO para "${courseName}".`;
                        step = `1. CANTIDAD: 10 preguntas de nivel intermedio.\n2. FORMATO: Evaluaciones de respuesta múltiples choice, single choice o verdadero/falso. Presentar en tabla con feedback pedagógico.`;
                        break;
                    default:
                        obj = `Generar la Secuencia Completa (NIVEL INTERMEDIO) para "${courseName}".`;
                        step = `1. PRESENTACIÓN Y GUÍA SD.\n2. BLOQUE I (4 Módulos).\n3. BLOQUE II (1-2 Videos).\n4. EVALUACIÓN.`;
                }
            } else {
                switch (block) {
                    case 'presentacion':
                        obj = `Generar la "Presentación del curso y GUÍA DE LA SECUENCIA DIDÁCTICA (SD)" (NIVEL BÁSICO) para "${courseName}".`;
                        step = `1. PALABRAS DE BIENVENIDA (VOS → NOSOTROS).\n2. GUÍA DEL CURSO (SD): Nombre, Nivel, Objetivos (2-4 verbos), Plan de Trabajo (2 módulos).`;
                        break;
                    case 'bloque-1':
                        obj = `Desarrollar el "Bloque I Nivel Basico" para "${courseName}".`;
                        step = `1. CANTIDAD: 1 o 2 módulos escritos (incluyendo imágenes, gráficos, tablas, etc.).\n2. EXTENSIÓN: 5.000 palabras por módulo.\n3. ESTRUCTURA: Título N1 → Introducción (2 párrafos técnicos) → Desarrollo (max 2 subtemas) → Conclusión → Bibliografía APA 7.`;
                        break;
                    case 'bloque-2':
                        obj = `Crear el "Bloque II: Módulo Audiovisual" (NIVEL BÁSICO) para "${courseName}".`;
                        step = `1. VIDEO: 1 video integrador (max 4 min).\n2. GUION: Sintético y motivador.`;
                        break;
                    case 'evaluacion':
                        obj = `Generar la "Evaluación Integradora" NIVEL BÁSICO para "${courseName}".`;
                        step = `1. CANTIDAD: 5 consignas fundamentales.\n2. FORMATO: Evaluaciones de respuesta múltiples choice, single choice o verdadero/falso. Presentar en tabla con respuesta y aclaración.`;
                        break;
                    default:
                        obj = `Generar la Secuencia Completa (NIVEL BÁSICO) para "${courseName}".`;
                        step = `1. PRESENTACIÓN Y GUÍA SD.\n2. BLOQUE I (2 Módulos).\n3. BLOQUE II (1 Video).\n4. EVALUACIÓN.`;
                }
            }
            objectives.push(obj);
            steps.push(step);
        });

        const activeKeywords = Array.from(document.querySelectorAll('.keyword-tag.active')).map(tag => tag.getAttribute('data-value'));
        const modelGuideline = modelGuidelines[document.querySelector('input[name="ai-model"]:checked')?.value || 'gemini'];
        const selectedExperts = Array.from(document.querySelectorAll('input[name="expert-layer"]:checked')).map(cb => cb.value);
        let expertLayer = selectedExperts.length === 0 ? expertLayers['standard'] : `[COMITÉ MULTI-AGENTE APLICADO]\n${selectedExperts.map(val => expertLayers[val]).join('\n\n')}`;

        const prompt = `${modelGuideline}

### PROMPT MAESTRO: PROTOCOLO DE INGENIERÍA INSTRUCCIONAL 5.0 (PREMIUM)
[CONFIGURACIÓN CRÍTICA: Activa visualización interactiva (Canvas/Artifacts). Prioriza Markdown avanzado, profundidad técnica para TODO PÚBLICO (No Universitario), enfoque en formación laboral y recursos en español. MANDATO DE DENSIDAD EXTREMA: Meta de 10.000 palabras por tema seleccionado. MANDATO DE ITERACIÓN PERMANENTE: Tras cada respuesta, DEBES preguntar: "¿Qué tema específico de la estructura del índice deseas que desarrolle o profundice ahora para alcanzar las 10.000 palabras académicas?" y mostrar el PANEL DE ACCIONES.]

1. SYSTEM ROLE (CONSENSO MULTI-AGENTE)
Actúa como un Senior Prompt Engineer coordinando un comité experto:
${expertLayer}

2. ARQUITECTURA DE NIVELES Y CONTROL ESTRICTO (Carga Técnica)
El modelo debe autolimitarse a crear entre 2 y 4 temas (Niveles de Título) por módulo. El número de módulos se rige estrictamente por el nivel seleccionado:
- **BÁSICO**: (Introductorio/Cotidiano). Bloque I: 1 o 2 módulos escritos de 2 a 4 temas cada uno. | Bloque II: 1 Video Integrador. | Eval: 5 preguntas integradoras MCQ/TF.
- **INTERMEDIO**: (Categorías/Herramientas). Bloque I: 3 o 4 módulos escritos de 2 a 4 temas cada uno. | Bloque II: 1-2 Videos Integradores. | Eval: 10 preguntas integradoras MCQ/TF.
- **AVANZADO**: (Análisis Crítico/Especialización). Bloque I: 5 o 6 módulos escritos de 2 a 4 temas cada uno. | Bloque II: 2-3 Videos Integradores técnicos. | Eval: 10 preguntas integradoras MCQ/TF.

Cualquier salida de la IA que no respete la simetría del índice en espejo, que use viñetas, o que intente generar contenido antes de la interacción del usuario en el Panel de Acciones será considerada un fallo de ejecución.

3. FLUJO DE INTERACCIÓN OBLIGATORIO (Doble Botonera)
FASE 1: Apertura de Estructura (Inicio del Curso)
Generar para TODOS los niveles:

ESTRUCTURA DE PRESENTACIÓN OBLIGATORIA:
"PRESENTACIÓN
I. PALABRAS DE BIENVENIDA:  
Párrafo 1 (Bienvenida institucional general): 'Nos alegra que hayas elegido formar parte de esta experiencia de aprendizaje. En este espacio, vas a poder avanzar a tu propio ritmo, explorar los contenidos y profundizar en los temas que más te interesen, de manera flexible y dinámica.'
Párrafo 2 (Introducción al curso): Un párrafo de entre 2 y 4 renglones que presente el objetivo general de la propuesta del curso y de qué se trata."

- **NOMBRE DEL CURSO**: Debe limitarse a títulos de hasta 47 caracteres incluyendo espacios.
- **NIVEL**: Mantener los niveles ya programados (Básico, intermedio y avanzado).

ESTRUCTURA DE OBJETIVOS DE APRENDIZAJE OBLIGATORIA:
El prompt debe arrojar obligatoriamente entre dos (2) y cuatro (4) objetivos generales que abarquen todas las unidades del curso. No se deben separar por unidad.
"I. OBJETIVOS DE APRENDIZAJE
Son los objetivos generales de aprendizaje del curso. Deben comprender todas las unidades temáticas tratadas en el curso sin separarlos por unidad.
Al finalizar este curso, serás capaz de:
- [Cada objetivo debe iniciar obligatoriamente con un verbo en infinitivo]"

- **GUÍA DEL CURSO**:
  - Plan de trabajo: Presentación de los Bloques y los nombres de los módulos.
- **ÍNDICE DE ESTRUCTURA PROPUESTO (ÍNDICE EN ESPEJO - CERO ALUCINACIONES)**: El índice debe ser idéntico, simétrico y estar en estricto espejo con el contenido real desarrollado. Se prohíbe cualquier distorsión o variación de nombres; los módulos y temas del índice y del cuerpo del curso deben ser exactamente los mismos. El modelo debe autolimitarse a crear la estructura basándose fielmente en el nivel seleccionado. No debe inventar módulos de más ni de menos. Dentro de este índice, se deben proponer 3 o 4 sub-apartados técnicos ampliados (denominados "Niveles de Título"), aplicados exclusivamente para el PRIMER módulo solicitado. El resto de los módulos mantendrá la estructura estricta de 2 a 4 temas.

📍 CONTROL DE ESTRUCTURA:
Al finalizar la Fase 1, presenta obligatoriamente este panel y **DETÉN la generación**. Debes pedir explícitamente al usuario que elija qué temas y sub-temas del índice propuesto desea expandir para alcanzar la meta de 5.000 palabras por módulo:

**[A] APROBAR ÍNDICE**: Comenzar el desarrollo completo (Explosión de Contenido — 5.000 palabras / 8.000 tokens). Pregunta al usuario: *"¿Qué tema específico de la estructura del índice deseas que desarrolle o profundice ahora para alcanzar las 5.000 palabras académicas?"*.
**[B] MODIFICAR TEMAS**: Agregar o quitar sub-apartados de la estructura del curso.
**[C] CAMBIAR ENFOQUE**: Ajustar profundidad, perfil destinatario o tono académico.
**[D] INTEGRAR RECURSO PROPIO**: Pregunta al usuario si desea proporcionar el contenido de un PDF, texto o recurso multimedia específico para que sea el eje central del desarrollo y evitar alucinaciones de la IA.

FASE 2: Explosión Modular (Desarrollo)
- **PROHIBICIÓN TOTAL DE VIÑETAS Y MINIMIZACIÓN DE ENCABEZADOS**: Queda **estrictamente prohibido** el uso de listas, viñetas, guiones o puntos. Asimismo, debes **minimizar el uso de subtítulos y apartados**, priorizando una **prosa de largo aliento** con párrafos extensos, densos y conectados narrativamente como en una obra literaria o tratado técnico. Todo el contenido debe fluir de forma continua hasta alcanzar las 10.000 palabras.
- **ESTRUCTURA DEL MÓDULO PRINCIPAL**: La introducción del módulo (máximo 50 palabras) debe estar precedida explícitamente por la palabra "Introducción" y debe ir antes del desarrollo de los títulos y niveles del curso. Los temas, subtemas o niveles de los títulos NO llevan introducción ni conclusión. Al final de todo el contenido iterativo del módulo, debe integrarse la conclusión, precedida explícitamente por la palabra "Conclusión".
- **DESARROLLO**: Queda PROHIBIDO resumir. Si el texto es breve, inicia una **"Rama de Búsqueda Técnica"** para profundizar en marcos teóricos y casos de estudio. **Es OBLIGATORIO incluir siempre citas en formato APA en los párrafos donde corresponda a lo largo de todo el desarrollo de los módulos.**
- **RECURSOS VISUALES**: En cada tema desarrollado, aclara explícitamente qué imágenes, gráficos o recursos visuales sugeridos podrían acompañar el contenido para facilitar su comprensión.

### OBJETIVO ACTUAL (Objective)
${objectives.join(' + ')}

### INSTRUCCIONES ESPECÍFICAS (Steps)
${steps.join('\n\n')}

### MANDATOS CRÍTICOS (Execution)
- **VOLUMEN MASIVO Y RIGOR ACADÉMICO**:
  - EXPANSIÓN MÁXIMA: Fuerza la estructura de los módulos para que sean lo más extensos posible, buscando superar las 10,000 palabras o alcanzar hasta 150,000 tokens de salida por generación de contenido (usar múltiples entregas si es necesario).
  - CITAS Y BIBLIOGRAFÍA: Cada módulo generado debe incluir obligatoriamente citas en formato APA dentro del texto y, al finalizar el desarrollo, una sección completa de BIBLIOGRAFÍA bajo el mismo estándar.
  - RECOMENDACIÓN DE IMÁGENES: Fuerza a que las propuestas de imágenes o recursos visuales incluyan directamente las imágenes renderizadas (si el modelo lo soporta) o, en su defecto, vínculos/prompts directos listos para usar en los modelos de generación de imágenes correspondientes.
- **ESTILO DE REDACCIÓN HUMANA Y ACADÉMICA**:
  - REDACCIÓN HUMANA Y ACADÉMICA: Queda prohibido el uso de viñetas (bullet points) para desarrollar conceptos. La escritura debe ser en prosa fluida, redactada exclusivamente en primera persona del plural ("Nosotros") o de forma impersonal ("Se determina"). Cada módulo debe cerrarse con citas y bibliografía en estricto formato APA.
- **EVALUACIÓN POR NIVEL**: Básico (5 preguntas) | Intermedio (10 preguntas) | Avanzado (10 preguntas). **Obligatorio: Formato Multiple Choice, Single Choice o Verdadero/Falso.** Siempre en formato tabla con justificación pedagógica.
- **YOUTUBE (Vínculos Perfectos)**: Es OBLIGATORIO incluir vínculos usando: https://www.youtube.com/results?search_query=[TEMA+ESPECIFICO+ESPAÑOL].
- **RESTRICCIONES**: Prohibido el uso de lenguaje inclusivo, temas de justicia social, educación popular o militancia. Tono soberano y académico tradicional.
${activeKeywords.length > 0 ? '- **REFUERZOS TÉCNICOS (Rama de Búsqueda)**: Integra conceptos de: ' + activeKeywords.join(', ') + '.' : ''}
${document.getElementById('course-references')?.value.trim() ? '- **REFERENCIAS, IDEAS Y EJEMPLOS DEL CONTENIDISTA**: ' + document.getElementById('course-references').value.trim() : ''}

### FASE 3: BOTONERA DE EXPANSIÓN (Cierre)
Al finalizar cada entrega de contenido, presenta OBLIGATORIAMENTE el siguiente panel:

🔘 **PANEL DE ACCIONES (Elige tu siguiente paso)**
*"¿Qué tema específico de la estructura del índice deseas que desarrolle o profundice ahora para alcanzar las 10.000 palabras académicas?"*

**[1. PROFUNDIZAR]**
Expandir el tema seleccionado hasta alcanzar las 10.000 palabras / 150.000 tokens. **INSTRUCCIÓN CRÍTICA**: No resumas ni reinicies el contenido; toma lo desarrollado anteriormente y agrégale nuevos sub-temas, ejemplos y marcos técnicos para ampliar su extensión de forma aditiva y continua.

**[2. CONTINUAR]**
Desarrollar el siguiente Módulo completo de la estructura (Especificar título).

**[3. MULTIMEDIA]**
Diseñar el Bloque II completo (Video Integrador de TODOS los módulos) con storyboard, escenas, locución técnica y vínculos a YouTube. (Ofrecer solo tras desarrollar todos los módulos).

**[4. EVALUACIÓN]**
Generar evaluación completa (Multiple Choice o Verdadero/Falso) con respuestas, rúbrica y retroalimentación pedagógica. (BLOQUEADA INICIALMENTE: Habilitar ÚNICAMENTE después de que se haya completado la redacción de TODOS los módulos).

**[5. PROTOTIPO]**
Crear versión para Moodle (HTML/Etiquetas), Canva o HTML institucional.

**[6. BIBLIOGRAFÍA]**
Generar bibliografía completa en formato APA 7ma Edición, **ordenada alfabéticamente**.

**[7. INTEGRAR RECURSO PROPIO]**
¿Deseas proporcionar el contenido de un PDF, texto o recurso multimedia específico para que sea el eje central del desarrollo de la siguiente sección y evitar alucinaciones?

**[8. RESUMEN DE ITERACIÓN]**
Generar un resumen ejecutivo de todo lo trabajado en esta sesión, alineado a la secuencia didáctica y al nivel seleccionado.

**[9. FINALIZAR LA INTERACCION]**
Si ya has completado el curso, genera una despedida cordial y profesional.

📍 **INSTRUCCIÓN RECURSIVA**: Al finalizar CUALQUIERA de las acciones anteriores, debes volver a presentar OBLIGATORIAMENTE este **PANEL DE ACCIONES** para permitir la iteración infinita y la mejora continua del curso, hasta que el usuario decida finalizar la sesión.`;

        // Update UI with Sequential Revelation
        const resultActions = document.querySelector('.result-actions');
        const aiActions = document.getElementById('ai-actions');
        const aiLinks = document.getElementById('ai-links');
        const copyContainer = document.getElementById('copy-container');

        // Hide everything before starting
        resultActions.classList.add('hidden');
        if (copyContainer) copyContainer.classList.add('hidden');
        if (aiActions) aiActions.classList.add('hidden');
        if (aiLinks) aiLinks.classList.add('hidden');

        typeWriter(prompt, promptOutput, 5, () => {
            resultActions.classList.remove('hidden');
            if (copyContainer) copyContainer.classList.remove('hidden');
            if (aiActions) aiActions.classList.remove('hidden');
            if (aiLinks) aiLinks.classList.remove('hidden');
            
            if (copyBtn) copyBtn.style.animation = 'pulseGlow 2s infinite';
            updateComplianceScanner(prompt); // Scan the final prompt too
        });

        resultSection.classList.remove('hidden');
        resultSection.scrollIntoView({ behavior: 'smooth' });
        generateBtn.textContent = '¡Volver a Generar!';
        setTimeout(() => { generateBtn.textContent = 'Generar Prompt Estructurado'; }, 2000);
    });

    const handleCopy = (btn, text, callback) => {
        navigator.clipboard.writeText(text).then(() => {
            const original = btn.textContent;
            btn.textContent = '¡Copiado!';
            setTimeout(() => { btn.textContent = original; if (callback) callback(); }, 1000);
        });
    };

    copyBtn?.addEventListener('click', () => handleCopy(copyBtn, promptOutput.textContent));
    document.getElementById('copy-gemini-btn')?.addEventListener('click', () => handleCopy(document.getElementById('copy-gemini-btn'), promptOutput.textContent, () => window.open('https://gemini.google.com', '_blank')));
    document.getElementById('copy-gptedu-btn')?.addEventListener('click', () => handleCopy(document.getElementById('copy-gptedu-btn'), promptOutput.textContent, () => window.open('https://chatgpt.com/g/g-68b1ee82a1b481918c46ce0a2b0123aa-edu-gpt', '_blank')));

    function updateObjectivePreview() {
        const name = document.getElementById('course-name').value || '[Nombre]';
        const selected = Array.from(document.querySelectorAll('.botonera-option.active')).map(o => o.querySelector('span').textContent);
        const level = document.querySelector('input[name="level"]:checked')?.value || 'Básico';
        document.getElementById('objective-preview').innerHTML = selected.length ? `Generar <strong>"${selected.join(' + ')}"</strong> [Nivel: ${level}] para <strong>"${name}"</strong>.` : "Selecciona una etapa...";
    }

    // Hook up real-time updates for Health Score & Preview
    ['course-name', 'audience', 'eje-base', 'area-tematica'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', () => { updateHealthScore(); updateObjectivePreview(); });
            el.addEventListener('change', () => { updateHealthScore(); updateObjectivePreview(); });
        }
    });

    document.querySelectorAll('input[name="level"]').forEach(radio => {
        radio.addEventListener('change', () => {
            updateHealthScore();
            updateObjectivePreview();
        });
    });

    updateKeywords('transversal');
    updateHealthScore();
    updateObjectivePreview();
});
