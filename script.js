document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const resultSection = document.getElementById('result-section');
    const promptOutput = document.getElementById('prompt-output');
    const magicFillBtn = document.getElementById('magic-fill');

    let isTyping = false;

    const typeWriter = (text, element, speed = 5, callback = null) => {
        isTyping = true;
        element.textContent = '';
        element.classList.add('typing');
        let i = 0;

        function type() {
            if (i < text.length) {
                // Append 3 characters at a time for faster/smoother "AI-like" flow
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

    // Categorization Data - EXTENDED INSTITUTIONAL MAPPING
    const thematicAreas = {
        'promocion-humana': ['Desarrollo Personal', 'Habilidades Digitales + IA', 'Nuevos Aprendizajes', 'Habilidades para Emprender'],
        'primera-infancia': ['Etapas del Desarrollo', 'Cuidados', 'Habilidades Digitales + IA', 'Nuevos Aprendizajes'],
        'adolescencia-juventud': ['Etapas del Desarrollo', 'Cuidados', 'Habilidades Digitales + IA', 'Nuevos Aprendizajes', 'Habilidades para Emprender'],
        'adultos-mayores': ['Desarrollo Personal', 'Cuidados', 'Habilidades Digitales + IA', 'Nuevos Aprendizajes', 'Habilidades para Emprender']
    };

    const keywordsByArea = {
        'transversal': ['Innovador', 'Práctico', 'Dinámico', 'Sostenido', 'Accesible', 'Participativo', 'Comunitario'],
        'Desarrollo Personal': ['Autonomía', 'Bienestar emocional', 'Identidad', 'Autogestión', 'Habilidades blandas'],
        'Habilidades Digitales + IA': ['Alfabetización digital', 'Herramientas IA', 'Productividad', 'Ciudadanía digital', 'Prompt engineering'],
        'Nuevos Aprendizajes': ['Aprendizaje activo', 'Metacognición', 'Adaptabilidad', 'Curiosidad', 'Aprendizaje autónomo'],
        'Habilidades para Emprender': ['Autogestión económica', 'Marketing digital'],
        'Etapas del Desarrollo': ['Desarrollo integral', 'Vínculo afectivo', 'Crianza positiva', 'Enfoque de derechos', 'Acompañamiento familiar'],
        'Cuidados': ['Cuidado comunitario', 'Redes de apoyo', 'Crianza saludable', 'Corresponsabilidad', 'Salud y bienestar']
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
        'perplexity': `[OPTIMIZACIÓN PARA PERPLEXITY: Brinda consejos basados en las últimas tendencias educativas. Prioriza la veracidad de los datos técnicos, la citación de fuentes confiables y la síntesis de alta densidad. Incluye siempre recursos multimedia (videos) exclusivamente en español.]`
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

    const oerResources = {
        'Desarrollo Personal': [
            { title: 'Habilidades para la Vida (UNESCO)', url: 'https://unesdoc.unesco.org/', source: 'UNESCO' },
            { title: 'Recursos de Bienestar Emocional', url: '#', source: 'Educ.ar' }
        ],
        'Habilidades Digitales + IA': [
            { title: 'Marco de Competencias IA (UNESCO)', url: 'https://unesdoc.unesco.org/ark:/48223/pf0000385202', source: 'UNESCO' },
            { title: 'Guía de IA para Docentes', url: '#', source: 'Portal Educativo' }
        ],
        'Nuevos Aprendizajes': [
            { title: 'Metodologías Activas OER', url: '#', source: 'OER Commons' },
            { title: 'Aprendizaje Basado en Proyectos', url: '#', source: 'Eduteka' }
        ],
        'Habilidades para Emprender': [
            { title: 'Guía de Emprendimiento Social', url: '#', source: 'Ashoka' },
            { title: 'Recursos para Microemprendedores', url: '#', source: 'Economía Social' }
        ],
        'Etapas del Desarrollo': [
            { title: 'Guía de Desarrollo Infantil Temprano', url: '#', source: 'UNICEF' },
            { title: 'Recursos de Crianza Positiva', url: '#', source: 'Red Primeros Años' }
        ],
        'Cuidados': [
            { title: 'Manual de Cuidados Comunitarios', url: '#', source: 'Desarrollo Social' },
            { title: 'Redes de Apoyo Local', url: '#', source: 'Territorio' }
        ]
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
                updateHealthScore(); // Update health on keyword change
            });
            keywordContainer.appendChild(span);
        });

        // OER logic removed for Cursos Propios
    };

    const oerContainer = document.getElementById('oer-container');
    const oerList = document.getElementById('oer-list');
    const oerBadge = document.getElementById('oer-badge');

    // OER Suggestions disabled for this module
    function updateOERSuggestions(area) {
        return;
    }

    // Hierarchical Dropdown Logic
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

    // Custom Keywords Logic
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
                span.addEventListener('click', () => {
                    span.classList.toggle('active');
                    updateHealthScore();
                });
                keywordContainer.appendChild(span);
                customKeywordInput.value = '';
                updateHealthScore();
            }
        });
    }

    // Initial keyword load
    updateKeywords('transversal');

    // Intention Detection Logic
    const sparkleContainer = document.getElementById('sparkle-suggestion');
    const intensionMap = {
        'ia': 'Inteligencia Artificial (IA)',
        'prompt': 'Inteligencia Artificial (IA)',
        'computadora': 'Habilidades digitales',
        'digital': 'Habilidades digitales',
        'social': 'Promoción humana',
        'género': 'Promoción humana',
        'emprender': 'Comercialización / Habilidades emprendedoras',
        'negocio': 'Comercialización / Habilidades emprendedoras',
        'dinero': 'Comercialización / Habilidades emprendedoras'
    };

    const courseNameInput = document.getElementById('course-name');

    courseNameInput.addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase();
        sparkleContainer.innerHTML = '';

        for (const [key, area] of Object.entries(intensionMap)) {
            if (val.includes(key)) {
                const suggestion = document.createElement('div');
                suggestion.className = 'magic-btn';
                suggestion.style.animation = 'fadeIn 0.5s ease-out';
                suggestion.textContent = `✨ Vincular con ${area}`;
                suggestion.addEventListener('click', () => {
                    const option = Array.from(ejeBaseSelect.options).find(opt => opt.text.includes(area) || area.includes(opt.text));
                    if (option) {
                        ejeBaseSelect.value = option.value;
                        ejeBaseSelect.dispatchEvent(new Event('change'));
                    }
                    suggestion.remove();
                });
                sparkleContainer.appendChild(suggestion);
                break;
            }
        }
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
            // Add listener after small delay to ensure DOM is ready
            setTimeout(() => {
                const btn = document.getElementById('open-glossary');
                if (btn) btn.addEventListener('click', openGlossary);
            }, 0);
            complianceAlert.classList.remove('hidden');
        } else {
            complianceAlert.classList.add('hidden');
        }
    }

    // Glossary Modal Logic
    const glossaryModal = document.getElementById('glossary-modal');
    const closeGlossary = document.getElementById('close-glossary');
    const glossaryContent = document.getElementById('glossary-list');

    function openGlossary() {
        populateGlossary();
        glossaryModal.classList.remove('hidden');
    }

    function populateGlossary() {
        let html = '<div class="glossary-grid">';
        html += '<div class="glossary-header-row"><span>Término a evitar</span><span>Sugerencia Institucional</span></div>';
        for (const [term, suggestion] of Object.entries(forbiddenTerms)) {
            html += `<div class="glossary-row">
                <span class="bad-term">${term}</span>
                <span class="good-term"><i class="fas fa-arrow-right"></i> ${suggestion}</span>
            </div>`;
        }
        html += '</div>';
        glossaryContent.innerHTML = html;
    }

    closeGlossary.addEventListener('click', () => glossaryModal.classList.add('hidden'));
    
    window.addEventListener('click', (e) => {
        if (e.target === glossaryModal) glossaryModal.classList.add('hidden');
    });

    // Magic Fill Functionality
    const examples = [
        {
            name: "Introducción a la Inteligencia Artificial",
            audience: "estudiantes",
            eje: "promocion-humana",
            area: "Habilidades Digitales + IA",
            block: "estructura-completa",
            level: "Intermedio",
            pedagogy: "práctico y basado en talleres",
            tone: "claro, motivador y cercano",
            keywords: ["Certificable", "Innovador", "Dinámico"]
        },
        {
            name: "Habilidades para el Empleo",
            audience: "beneficiarios de programas sociales",
            eje: "adultos-mayores",
            area: "Habilidades para Emprender",
            block: "bloque-1",
            level: "Básico",
            pedagogy: "vivencial y reflexivo",
            tone: "accesible y dinámico",
            keywords: ["Accesible", "Comunitario", "Práctico"]
        }
    ];

    magicFillBtn.addEventListener('click', () => {
        const ex = examples[Math.floor(Math.random() * examples.length)];

        document.getElementById('course-name').value = ex.name;
        document.getElementById('audience').value = ex.audience;
        document.getElementById('eje-base').value = ex.eje;

        // Trigger change to populate areas
        document.getElementById('eje-base').dispatchEvent(new Event('change'));

        setTimeout(() => {
            document.getElementById('area-tematica').value = ex.area;
            document.getElementById('area-tematica').dispatchEvent(new Event('change'));

            document.getElementById('block').value = ex.block;
            document.getElementById('pedagogy').value = ex.pedagogy;
            document.querySelector(`input[name="tone"][value="${ex.tone}"]`).checked = true;

            // Level (now radio button, single value)
            const levelRadio = document.querySelector(`input[name="level"][value="${ex.level}"]`);
            if (levelRadio) levelRadio.checked = true;

            // Keywords
            setTimeout(() => {
                document.querySelectorAll('.keyword-tag').forEach(tag => {
                    if (ex.keywords.includes(tag.textContent)) {
                        tag.classList.add('active');
                    } else {
                        tag.classList.remove('active');
                    }
                });
                updateHealthScore();
                updateComplianceScanner(document.getElementById('course-name').value);
            }, 100);
        }, 50);
    });

    // Initial keyword load
    updateKeywords('transversal');

    // ===== SALUD DEL PROMPT - RADAR CHART LOGIC =====
    const RADAR_AXES = [
        { label: 'Identidad', key: 'nombre' },
        { label: 'Público', key: 'publico' },
        { label: 'Eje Inst.', key: 'eje' },
        { label: 'Área', key: 'area' },
        { label: 'Bloque SD', key: 'bloque' },
        { label: 'Keywords', key: 'keywords' }
    ];

    const CX = 150, CY = 150, MAX_R = 110;

    function polarToCartesian(cx, cy, r, angleRad) {
        return {
            x: cx + r * Math.cos(angleRad),
            y: cy + r * Math.sin(angleRad)
        };
    }

    function initRadar() {
        const axesGroup = document.getElementById('radar-axes');
        const labelsGroup = document.getElementById('radar-labels');
        axesGroup.innerHTML = '';
        labelsGroup.innerHTML = '';

        const n = RADAR_AXES.length;
        RADAR_AXES.forEach((axis, i) => {
            const angle = (Math.PI * 2 * i / n) - Math.PI / 2;
            const end = polarToCartesian(CX, CY, MAX_R, angle);
            const labelPos = polarToCartesian(CX, CY, MAX_R + 22, angle);

            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', CX); line.setAttribute('y1', CY);
            line.setAttribute('x2', end.x); line.setAttribute('y2', end.y);
            line.setAttribute('stroke', 'rgba(255,255,255,0.08)');
            line.setAttribute('stroke-width', '1');
            axesGroup.appendChild(line);

            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', labelPos.x);
            text.setAttribute('y', labelPos.y);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('dominant-baseline', 'middle');
            text.setAttribute('font-size', '10');
            text.setAttribute('fill', '#94a3b8');
            text.setAttribute('font-family', 'Outfit, sans-serif');
            text.textContent = axis.label;
            labelsGroup.appendChild(text);
        });
    }

    function updateRadar(scores) {
        const n = RADAR_AXES.length;
        const pointsGroup = document.getElementById('radar-points');
        const polygon = document.getElementById('radar-polygon');
        pointsGroup.innerHTML = '';

        const pts = RADAR_AXES.map((axis, i) => {
            const angle = (Math.PI * 2 * i / n) - Math.PI / 2;
            const r = MAX_R * (scores[axis.key] || 0);
            return polarToCartesian(CX, CY, r, angle);
        });

        polygon.setAttribute('points', pts.map(p => `${p.x},${p.y}`).join(' '));

        // Animate polygon color by average
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

    function updateHealthScore() {
        const courseNameValue = document.getElementById('course-name').value.trim();
        const audienceEl = document.getElementById('audience');
        const audienceVal = audienceEl.value;
        const ejeVal = ejeBaseSelect.value;
        const areaVal = areaTematicaSelect.value;
        const blockEl = document.getElementById('block');
        const blockVal = blockEl.value;
        const keywordsCount = document.querySelectorAll('.keyword-tag.active').length;

        const scores = {
            nombre: Math.min(courseNameValue.length / 5, 1), // More sensitive score (max at 5 chars)
            publico: audienceVal ? 1 : 0,
            eje: ejeVal ? 1 : 0,
            area: areaVal && areaVal !== 'Primero selecciona un eje...' ? 1 : 0,
            bloque: blockVal && blockVal !== 'estructura-completa' ? 1 : (blockVal === 'estructura-completa' ? 0.8 : 0),
            keywords: Math.min(keywordsCount / 3, 1)
        };

        updateRadar(scores);

        const total = Math.round((Object.values(scores).reduce((a, b) => a + b, 0) / RADAR_AXES.length) * 100);
        const scoreArc = document.getElementById('score-arc');
        const circumference = 264;

        if (scoreArc) {
            scoreArc.style.strokeDashoffset = circumference - (circumference * total / 100);
            if (total >= 85) {
                scoreArc.style.stroke = '#10b981';
                scoreArc.style.filter = 'drop-shadow(0 0 8px #10b981)';
                document.getElementById('score-status').textContent = 'Excelente';
            } else if (total >= 60) {
                scoreArc.style.stroke = '#6366f1';
                scoreArc.style.filter = 'drop-shadow(0 0 8px #6366f1)';
                document.getElementById('score-status').textContent = 'Bueno';
            } else if (total >= 30) {
                scoreArc.style.stroke = '#f59e0b';
                scoreArc.style.filter = 'drop-shadow(0 0 8px #f59e0b)';
                document.getElementById('score-status').textContent = 'Básico';
            } else {
                scoreArc.style.stroke = '#f43f5e';
                scoreArc.style.filter = 'drop-shadow(0 0 8px #f43f5e)';
                document.getElementById('score-status').textContent = 'Incompleto';
            }
        }

        document.getElementById('score-number').textContent = total + '%';

        // Update metric items Safely
        const getSelectText = (el) => {
            if (!el || el.selectedIndex === -1) return '—';
            const opt = el.options[el.selectedIndex];
            return opt.value ? opt.text : '—';
        };

        const metricMap = [
            { id: 'metric-nombre', val: courseNameValue || '—', score: scores.nombre },
            { id: 'metric-publico', val: getSelectText(audienceEl), score: scores.publico },
            { id: 'metric-eje', val: getSelectText(ejeBaseSelect), score: scores.eje },
            { id: 'metric-area', val: areaVal && areaVal !== 'Primero selecciona un eje...' ? areaVal : '—', score: scores.area },
            { id: 'metric-bloque', val: getSelectText(blockEl), score: scores.bloque },
            { id: 'metric-keywords', val: keywordsCount > 0 ? `${keywordsCount} seleccionadas` : '—', score: scores.keywords }
        ];

        metricMap.forEach(({ id, val, score }) => {
            const el = document.getElementById(id);
            if (!el) return;
            const dot = el.querySelector('.metric-dot');
            const valEl = el.querySelector('.metric-val');

            if (valEl) {
                valEl.textContent = val.length > 20 ? val.substring(0, 20) + '…' : val;
            }

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

        updateObjectivePreview();
    }

    initRadar();
    updateHealthScore();

    // Wire up listeners
    document.getElementById('audience').addEventListener('change', updateHealthScore);
    ejeBaseSelect.addEventListener('change', updateHealthScore);
    areaTematicaSelect.addEventListener('change', updateHealthScore);
    document.getElementById('block').addEventListener('change', updateHealthScore);
    document.querySelectorAll('input[name="level"]').forEach(cb => {
        cb.addEventListener('change', updateHealthScore);
    });
    document.getElementById('keyword-container').addEventListener('click', () => setTimeout(updateHealthScore, 50));


    // ===== END SALUD DEL PROMPT =====

    // Multi-Agent Selection Limit
    const expertCheckboxes = document.querySelectorAll('input[name="expert-layer"]');
    const expertWarning = document.getElementById('expert-limit-warning');
    
    expertCheckboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            const checkedCount = document.querySelectorAll('input[name="expert-layer"]:checked').length;
            
            if (checkedCount > 3) {
                cb.checked = false; // Prevent selection
                expertWarning.classList.remove('hidden');
                expertWarning.classList.add('visible');
                
                // Hide warning after 3 seconds
                setTimeout(() => {
                    expertWarning.classList.remove('visible');
                    setTimeout(() => expertWarning.classList.add('hidden'), 300);
                }, 3000);
            } else {
                expertWarning.classList.remove('visible');
                setTimeout(() => expertWarning.classList.add('hidden'), 300);
            }
        });
    });

    const copyGeminiBtn = document.getElementById('copy-gemini-btn');

    generateBtn.addEventListener('click', () => {
        if (isTyping) return;
        const courseName = document.getElementById('course-name').value;
        const audience = document.getElementById('audience').value;
        const ejeBase = ejeBaseSelect.options[ejeBaseSelect.selectedIndex] ? ejeBaseSelect.options[ejeBaseSelect.selectedIndex].text : '';
        const areaTematica = areaTematicaSelect.value;
        const block = document.getElementById('block').value;
        const pedagogy = document.getElementById('pedagogy').value;
        const toneElement = document.querySelector('input[name="tone"]:checked');
        const tone = toneElement ? toneElement.value : 'profesional';

        const activeLevel = document.querySelector('input[name="level"]:checked')?.value || 'Básico';
        
        // AI Model Optimization
        const selectedModel = document.querySelector('input[name="ai-model"]:checked')?.value || 'gemini';
        const modelGuideline = modelGuidelines[selectedModel] || '';

        // Multi-Agent expert layer (up to 3)
        const selectedExperts = Array.from(document.querySelectorAll('input[name="expert-layer"]:checked')).map(cb => cb.value);
        let expertLayer = '';
        if (selectedExperts.length === 0) {
            expertLayer = expertLayers['standard']; // Fallback
        } else {
            const combinedInstructions = selectedExperts.map(val => expertLayers[val]).join('\n\n');
            expertLayer = `[COMITÉ MULTI-AGENTE APLICADO]\nEl siguiente contenido debe ser generado simulando un consenso entre los siguientes roles expertos:\n\n${combinedInstructions}\n\nINSTRUCCIÓN CRÍTICA: Cada sección de tu respuesta debe reflejar la integración de estas perspectivas antes de ser presentada.`;
        }

        const isIntermediate = activeLevel === 'Intermedio';
        const isAdvanced = activeLevel === 'Avanzado';

        let objectiveText = '';
        let stepText = '';
        let knowledgeBaseAddons = '';
        let executionMandates = '';

        if (isAdvanced) {
            // ADVANCED LEVEL STRUCTURE - Lineamientos Institucionales Oficiales
            switch (block) {
                case 'presentacion':
                    objectiveText = `Generar la "Presentación y Guía SD" (NIVEL AVANZADO) para el curso "${courseName}".`;
                    stepText = `1. PALABRAS DE BIENVENIDA (Unidad General):
   - Lenguaje claro, NO INCLUSIVO, sencillo y sin modismos, en neutro.
   - Puede incluir una breve recuperación de los niveles Básico e Intermedio si corresponde.
   - Extensión máxima: 100 palabras.

2. PRESENTACIÓN DEL CURSO:
   - Introducción y desarrollo breve de los módulos/temas del recorrido del curso.
   - Extensión máxima: 250 palabras.

3. OBJETIVOS DE APRENDIZAJE:
   - "Al finalizar este encuentro, serás capaz de..."
   - Este nivel agrega actividades de mayor complejidad: análisis y aplicación más detallada.
   - Respetar la gradualidad de aprendizajes: cada Unidad-Módulo se corresponde con un objetivo.
   - Verbos sugeridos: Definir, Reconocer, Identificar, Comprender, Valorar. Entre 4 y 5 objetivos.

4. MAPA CONCEPTUAL (instrucciones para equipo de producción):
   - Tema Principal: [Especifica el tema central. Debe tener relación con los Niveles Básico e Intermedio.]
   - Subtemas: [Subtema 1], [Subtema 2], [Subtema 3]
   - Indicar: "Dibujar a mano alzada o insertar imagen del mapa conceptual con las ideas más importantes y el recorrido similar a la estructura de pensamiento."

5. CRONOGRAMA / PLAN DE TRABAJO:
   - Completar en archivo Word aparte dentro de la carpeta del curso.
   - Etiqueta: "CRONOGRAMA Y NOMBRE DEL CURSO" (ej: PLAN DE TRABAJO DE MARKETING PARA EMPRENDEDORES).`;
                    break;
                case 'bloque-1':
                    objectiveText = `Desarrollar los "Módulos Escritos (PDF)" NIVEL AVANZADO para el curso "${courseName}".`;
                    stepText = `1. ESTRUCTURA: 6 módulos escritos en .doc (el equipo de gráfica convertirá a PDF).
   - MÓDULO 1 al 6: [Nombre del módulo] - Extensión: 5.000 palabras (aprox. 12 páginas A4).
   - No superar las 30 páginas TOTALES del curso.

2. PASO A PASO PARA CADA MÓDULO:
   a) Página de Introducción a la Clase: objetivos del módulo, contenidos y recomendaciones para el estudio.
   b) Contenidos: explicación más detallada para el armado de las placas/PDF (equipo de producción).
   c) Video interactivo/integrador (ver sección audiovisual): actividades de mayor complejidad como soporte para las evaluaciones.
   d) Archivos de Práctica: ejercicios descargables o cuestionarios básicos. NO pedir entregas extensas. Actividades sumatorias a lo largo de los 4 módulos.

3. ACTIVIDADES PARCIALES:
   - Al cierre de los Módulos 1, 2 y 3: proponer 2 a 3 ejercicios o cuestionarios que recuperen lo visto.
   - Al cierre de los Módulos 4, 5 y 6: proponer 2 a 3 ejercicios o cuestionarios integradores.
   - Estas actividades NO conllevan devolución.

4. FORMATO: Calibri 11, interlineado sencillo, A4. Imágenes sin derechos de autor, licencia abierta o Creative Commons. Articular con equipo de gráfica.

5. CITAS Y BIBLIOGRAFÍA (Normas APA 7 - https://normas-apa.org/):
   - Cita directa: entre comillas + (Autor, Año, p. X). Ej: Rodríguez (2016) plantea: "..." (p. 437).
   - Cita indirecta/paráfrasis: citar (Autor, Año). Ej: Según Rodríguez (2016), ...
   - Bibliografía al final: alfabética, Normas APA. Ej: Fernández, J. (2019). Girasol de la mañana. Ediciones de la Banda Oriental.`;
                    break;
                case 'bloque-2':
                    objectiveText = `Crear los "Módulos Audiovisuales" (NIVEL AVANZADO) para "${courseName}".`;
                    stepText = `1. CANTIDAD Y DURACIÓN:
   - 2 videos integradores por curso.
   - Duración mínima: 90 segundos. Duración máxima: 3 minutos cada uno.
   - VIDEO 1: integra los contenidos de los Módulos 1, 2 y 3.
   - VIDEO 2: integra los contenidos de los Módulos 4, 5 y 6.
   - En línea con las actividades prácticas parciales.

2. FORMATO DEL GUION:
   - Tipografía: Arial o Calibri. Tamaño: 12. Interlineado: 1.5.
   - 1 minuto = 1 carilla (extensión máxima 3 carillas por video).
   - Pueden adjuntarse links de videos de referencia (solo orientación artística para el equipo de edición).
   - Recursos visuales: Creative Commons únicamente.

3. ESTRUCTURA DE CADA GUION (modelo orientativo):
   a) Introducción (10 segundos): Logo/Visual institucional + Locución de presentación del tema.
   b) Presentación del Tema (15 segundos): Imagen contextual + Locución motivadora que introduzca el concepto.
   c) Desarrollo I (15 segundos): Lista o imagen + Locución explicativa del subtema 1.
   d) Desarrollo II (15 segundos): Visual con diagrama o imagen + Locución del subtema 2.
   e) Desarrollo III (15 segundos): Visual con dato o imagen de impacto + Locución del subtema 3.
   f) Desarrollo IV-VII según extensión del video: continuar con imágenes descriptivas + locución paso a paso.
   g) Cierre (10 segundos): Visual/Logo institucional + Locución de síntesis e invitación a continuar.
   h) Despedida (5 segundos): Imagen de saludo + Locución de agradecimiento.

4. PAUTAS DE ESTILO:
   - Lenguaje claro, sin jerga técnica. Subtítulos para accesibilidad auditiva.
   - El guion debe ser redactado por el equipo responsable del curso, sugiriendo imágenes del repositorio.
   - Ofrecer enlaces a recursos adicionales (Creative Commons).`;
                    break;
                case 'evaluacion':
                    objectiveText = `Generar la "Evaluación Integradora Final" NIVEL AVANZADO para "${courseName}".`;
                    stepText = `1. EVALUACIÓN FINAL INTEGRADORA: de alta complejidad técnica, enfocada en la toma de decisiones y análisis experto.
2. CANTIDAD: Entre 15 y 20 ítems.
3. FORMATO: Múltiple Choice con 4 a 5 opciones de respuesta posibles por ítem.
4. CARÁCTER: Utilizar TABLAS profesionales para presentar las consignas y opciones.
5. MANDATO: ES OBLIGATORIO incluir la respuesta correcta (o respuestas si aplica) y una profunda aclaración pedagógica para cada ítem.`;
                    break;
                    break;
                default:
                    objectiveText = `Generar la Estructura Completa de Secuencia Didáctica (SD) NIVEL AVANZADO para "${courseName}".`;
                    stepText = `1. UNIDAD GENERAL - PRESENTACIÓN:
   - Bienvenida (máx. 100 pal, lenguaje neutro, NO inclusivo). Recuperar niveles previos si corresponde.
   - Presentación del Curso (máx. 250 pal): introducción y desarrollo breve de módulos.
   - Objetivos (4-5): "Al finalizar, serás capaz de..." Verbos: Definir, Reconocer, Identificar, Comprender, Valorar.
   - Mapa Conceptual: Tema Principal vinculado a niveles anteriores + Subtemas 1 al 6.
   - Cronograma: archivo Word aparte etiquetado con nombre del curso.

2. MÓDULOS (6 escritos en .doc, PDF final):
   - Módulos 1 al 6: 5.000 palabras cada uno. Total: máx. 30 páginas A4.
   - Cada módulo: Introducción → Contenidos para PDF → Video integrador → Práctica sumatoria.
   - Actividades parciales: 2-3 ejercicios al cierre M1+M2+M3 y al cierre M4+M5+M6 (sin devolución).
   - Calibri 11, imágenes Creative Commons. Bibliografía APA 7 al final.

3. AUDIOVISUAL: 2 videos (90s-3min c/u). VIDEO 1: integra M1, M2 y M3. VIDEO 2: integra M4, M5 y M6.
   - Guion: Arial/Calibri 12, interlineado 1.5. Estructura: Intro (10s) → Presentación (15s) → Desarrollos x5 (15s c/u) → Cierre (10s) → Despedida (5s).

4. EVALUACIÓN FINAL: 15-20 ítems (Múltiple Choice con 4-5 opciones) integradores. ES OBLIGATORIO incluir la respuesta correcta y una aclaración pedagógica para cada ítem en formato de TABLA.`;
            }
            knowledgeBaseAddons = `6. **Bibliografía y Citas (APA 7)**: Cita directa entre comillas (Autor, Año, p. X). Paráfrasis: citar (Autor, Año). Lista bibliográfica alfabética al final. Recursos visuales: Creative Commons.`;
            executionMandates = `- **CONFIGURACIÓN TÉCNICA POR MÓDULO**: 5.000 Palabras | 30.000 Caracteres | 7.000 Tokens | 12 páginas A4.
- **ESTILO DE REDACCIÓN**: Escritura natural, cohesiva y fluida. Queda PROHIBIDO el uso de viñetas, listas o numeraciones para el desarrollo de contenidos. Se busca una narrativa académica tradicional de alta densidad.
- **GRADUALIDAD**: Cada módulo se corresponde con un objetivo de aprendizaje.
- **ACTIVIDADES PARCIALES**: 2-3 ejercicios al cierre de M1+M2+M3 y M4+M5+M6 (sin devolución).
- **Recursos Audiovisuales (YouTube Search)**: Es OBLIGATORIO incluir vínculos a **Video Tutoriales de YouTube** en español. **PARA LINKS PERFECTOS**: Usa el formato de búsqueda https://www.youtube.com/results?search_query=[TEMA+ESPECIFICO+EN+ESPAÑOL] para garantizar que el usuario acceda siempre a contenido actualizado y funcional. Describe el contenido del video sugerido antes del link.
- **EXTENSIÓN CRÍTICA**: Cada módulo debe desarrollarse con una densidad de 5.000 palabras. Se exige la MÁXIMA EXTENSIÓN posible, desarrollando cada concepto con profundidad pedagógica experta y profesional.
- **BIBLIOGRAFÍA**: Al final de cada entrega, pregunta si se desea la bibliografía en normas APA.
- **EVALUACIÓN**: Todas las preguntas deben basarse estrictamente en la secuencia didáctica y devolver siempre la opción correcta.
- **SIMILITUD ESTRUCTURAL**: Todo el contenido generado (incluyendo videos y mockups de Moodle/Canva) debe ser lo más similar posible a la estructura de módulos y bloques del curso.`;
        } else if (isIntermediate) {
            // INTERMEDIATE LEVEL STRUCTURE - Lineamientos Institucionales Oficiales
            switch (block) {
                case 'presentacion':
                    objectiveText = `Generar la "Presentación y Guía SD" (NIVEL INTERMEDIO) para el curso "${courseName}".`;
                    stepText = `1. PALABRAS DE BIENVENIDA (Unidad General):
   - Lenguaje claro, NO INCLUSIVO, sencillo y sin modismos, en neutro.
   - Puede incluir una breve recuperación del nivel Básico si corresponde.
   - Extensión máxima: 100 palabras.

2. PRESENTACIÓN DEL CURSO:
   - Introducción y desarrollo breve de los módulos/temas del recorrido del curso.
   - Extensión máxima: 200 palabras.

3. OBJETIVOS DE APRENDIZAJE:
   - "Al finalizar este encuentro, serás capaz de..."
   - Incluir actividades de análisis y aplicación más detallada que permitan profundizar conceptos.
   - Respetar la gradualidad de aprendizajes: cada Unidad-Módulo debe corresponderse con un objetivo.
   - Verbos sugeridos: Definir, Reconocer, Identificar, Comprender, Valorar. Entre 4 y 5 objetivos.

4. MAPA CONCEPTUAL (instrucciones para equipo de producción):
   - Tema Principal: [Especifica el tema central del curso]
   - Subtemas: [Subtema 1], [Subtema 2], [Subtema 3]
   - Indicar: "Dibujar a mano alzada o insertar imagen del mapa conceptual con las ideas más importantes y el recorrido similar a la estructura de pensamiento."

5. EXCLUSIÓN CRÍTICA:
   - No incluir "Cronograma de Actividades" ni "Plan de Trabajo" en este bloque.`;
                    break;
                case 'bloque-1':
                    objectiveText = `Desarrollar los "Módulos Escritos (PDF)" NIVEL INTERMEDIO para el curso "${courseName}".`;
                    stepText = `1. ESTRUCTURA: 4 módulos escritos en .doc (el equipo de gráfica convertirá a PDF).
   - MÓDULO 1 al 4: [Nombre del módulo] - Extensión: 5.000 palabras (aprox. 12 páginas A4).
   - Total del curso: 20.000 palabras (aprox. 48 páginas A4).

2. CADA MÓDULO DEBE INCLUIR (PROFUNDIZACIÓN):
   - Prohibido generar información superficial o escueta.
   - Desarrollar conceptos complejos, casos de estudio, aplicaciones prácticas y marcos teóricos robustos. 
   - Densidad informativa para un estudio autodidacta efectivo.
   a) Página de Introducción: objetivos del módulo, contenidos y recomendaciones para el estudio.
   b) Contenidos: desarrollo profundo y detallado para el armado de las placas/PDF.
   c) Archivos de Práctica: ejercicios de aplicación o análisis de situaciones.

3. FORMATO: Calibri 11, interlineado sencillo, A4. Cuidar imágenes: sin derechos de autor, licencia abierta o Creative Commons. Listar comentarios descriptivos para equipo de gráfica.

4. CITAS Y BIBLIOGRAFÍA (Normas APA 7 - https://normas-apa.org/):
   - Cita directa: entre comillas + (Autor, Año, p. X). Ej: Rodríguez (2016) plantea: "..." (p. 437).
   - Cita indirecta/paráfrasis: citar (Autor, Año). Ej: Según Rodríguez (2016), ...
   - Bibliografía al final: alfabética, Normas APA. Ej: Fernández, J. (2019). Girasol de la mañana. Ediciones de la Banda Oriental.`;
                    break;
                case 'bloque-2':
                    objectiveText = `Crear el "Módulo Audiovisual" (NIVEL INTERMEDIO) para "${courseName}".`;
                    stepText = `1. DURACIÓN Y OBJETO:
   - Guion de locución profesional para un video de 3 a 4 minutos de duración.
   - Synthetizar los puntos críticos y conceptos clave de todos los módulos desarrollados.
   - Son videos integradores y de profundización para estudio autodidacta.

2. FORMATO DEL GUION:
   - Tipografía: Arial o Calibri. Tamaño: 12. Interlineado: 1.5.
   - Utilizar BLOQUES DE CITA para la locución.
   - Incluir marcas de tiempo estimadas y sugerencia de tono (ej. corporativo, cercano o técnico).

3. ESTRUCTURA DEL GUION:
   a) Introducción (10-15 segundos): Visual + Locución de bienvenida al tema global.
   b) Desarrollo de Puntos Críticos (2-3 minutos): Desglose de los conceptos más complejos de los módulos 1 a 4.
   c) Síntesis y Aplicación Práctica (30-45 segundos): Resumen de cómo aplicar lo aprendido.
   d) Cierre y Despedida (15 segundos): Invitación a la evaluación integradora.

4. PAUTAS DE ESTILO:
   - Lenguaje profesional, técnico pero accesible. Sin jerga innecesaria.
   - Marcar claramente los momentos de "Voice-Over".`;
                    break;
                case 'evaluacion':
                    objectiveText = `Generar la "Evaluación Integradora de Aprendizaje" NIVEL INTERMEDIO para "${courseName}".`;
                    stepText = `1. CUESTIONARIO de nivel intermedio: evita memorización simple, enfócate en la aplicación y el análisis.
2. CANTIDAD: Exactamente 10 consignas (ítems).
3. FORMATO: Múltiple Choice con entre 4 y 5 opciones de respuesta posibles por ítem.
4. CARÁCTER: Utilizar TABLAS profesionales para presentar las consignas y opciones.
5. Incluir: ES OBLIGATORIO incluir la respuesta correcta y una breve aclaración pedagógica para cada ítem.`;
                    break;
                default:
                    objectiveText = `Actuar como Experto en Diseño Instruccional Senior para generar una Secuencia Didáctica (SD) de alta calidad técnica (Nivel INTERMEDIO) para "${courseName}".`;
                    stepText = `1. PRESENTACIÓN Y MAPA CONCEPTUAL:
   - PRESENTACIÓN: Listar explícitamente los nombres de los 4 módulos que componen la formación.
   - MAPA CONCEPTUAL: Construir una estructura jerárquica clara que refleje la interconexión lógica, incluyendo los nombres de los 4 módulos.
   - EXCLUSIÓN ABSOLUTA: No incluir "Cronograma de Actividades" ni "Plan de Trabajo". La estructura debe saltar directamente al desarrollo de contenidos.

2. MÓDULOS DE CONTENIDO (4 Módulos):
   - Queda estrictamente prohibido generar información superficial o escueta.
   - Desarrollar cada módulo (M1 a M4) con una extensión mínima de 5.000 palabras.
   - Incluir conceptos complejos, casos de estudio detallados, aplicaciones prácticas y marcos teóricos robustos.
   - Densidad informativa suficiente para un estudio autodidacta profesional y efectivo.

3. GUIÓN PARA VIDEO RESUMEN (VOICE-OVER):
   - Generar un guion de locución profesional para un video de 3 a 4 minutos.
   - El guion debe sintetizar y resumir los puntos críticos y temas más importantes de todos los módulos desarrollados.
   - Incluir marcas de tiempo estimadas y bloques de cita para la locución.

4. EVALUACIÓN DE APRENDIZAJE:
   - Exactamente 10 ítems con 4 a 5 opciones de respuesta. ES OBLIGATORIO incluir la respuesta correcta y la aclaración pedagógica.
   - Enfoque en aplicación de conocimientos y análisis de situaciones. Presentar en TABLAS.

5. FLUJO OBLIGATORIO: Presentación > Mapa Conceptual > Módulos Desarrollados > Guion de Video > Evaluación.`;
            }
            knowledgeBaseAddons = `6. **Bibliografía y Citas (APA 7)**: Cita directa entre comillas (Autor, Año, p. X). Paráfrasis: citar (Autor, Año). Lista bibliográfica alfabética al final.`;
            executionMandates = `- **CONFIGURACIÓN TÉCNICA POR MÓDULO**: 5.000 Palabras | 30.000 Caracteres | 7.000 Tokens | 12 páginas A4.\n- **ESTILO DE REDACCIÓN**: Escritura natural, fluida y académica tradicional. PROHIBIDO el uso de viñetas o listas numeradas en el desarrollo. Todo el contenido debe ser narrativo y cohesivo.\n- **GRADUALIDAD**: Cada módulo correspond a un objetivo de aprendizaje.\n- **IMÁGENES Y VIDEOS**: Sin derechos de autor, licencia abierta o Creative Commons. Es OBLIGATORIO incluir vínculos a **Video Tutoriales de YouTube** en español. **VÍNCULOS PERFECTOS**: Utiliza el formato de búsqueda https://www.youtube.com/results?search_query=[TERMINO+DE+BUSQUEDA] para asegurar que el usuario siempre encuentre el video exacto.
- **EXTENSIÓN Y PROFUNDIDAD**: Mínimo 5.000 palabras por módulo. Se exige la MÁXIMA EXTENSIÓN posible, con alta densidad informativa, marcos teóricos robustos y aplicaciones prácticas. Prohibido el contenido genérico o breve.
- **BIBLIOGRAFÍA**: Al final de cada entrega, pregunta si se desea la bibliografía en normas APA.
- **EVALUACIÓN**: Todas las preguntas deben basarse estrictamente en la secuencia didáctica y devolver siempre la opción correcta.
- **SIMILITUD ESTRUCTURAL**: Todo el contenido generado debe ser lo más similar posible a la estructura de módulos y bloques del curso.`;
        } else {
            // BASIC LEVEL STRUCTURE - Lineamientos Institucionales Oficiales
            switch (block) {
                case 'presentacion':
                    objectiveText = `Generar la "Presentación y Guía SD" (NIVEL BÁSICO) para el curso "${courseName}".`;
                    stepText = `1. PALABRAS DE BIENVENIDA (pestaña para equipo de carga):
   - 1er párrafo: pronombre "VOS" (bienvenida a la plataforma).
   - 2do párrafo: pronombre "NOSOTROS" (bienvenida al curso).

2. GUÍA DEL CURSO (SD - PDF) con la siguiente estructura:
   - Nombre del Curso: corto, conciso, atractivo y representativo del contenido.
   - Nivel: Básico.
   - Objetivos de Aprendizaje: "Al finalizar este curso, serás capaz de..." con 2 a 4 verbos en infinitivo (Identificar, Reconocer, Aplicar, Comprender, etc.).
   - Plan de Trabajo: Bloque I (Módulo I y Módulo II), Bloque II (Audiovisual), Evaluación (tipo de consignas).
   - Mapa del Curso: expresar gráficamente títulos y subtítulos de cada módulo (indicar que se genera como PPT separado).`;
                    break;
                case 'bloque-1':
                    objectiveText = `Desarrollar el "Bloque I: Módulos Escritos (PDF)" NIVEL BÁSICO para el curso "${courseName}".`;
                    stepText = `1. CANTIDAD: 1 o 2 módulos escritos en PDF. Se puede agregar un 3er módulo si el tema lo requiere.
2. EXTENSIÓN: 5.000 palabras por módulo (aprox. 12 páginas A4 incluyendo imágenes, gráficos, tablas).
3. FORMATO: Calibri 11, Interlineado sencillo, página A4.

4. ESTRUCTURA DE CADA MÓDULO:
   a) TÍTULO (N1): Centrado, en negrita, palabras iniciando en mayúscula. Solo el nombre, sin indicaciones adicionales.
   b) Introducción (N2): Alineado a la izquierda, negrita, mayúscula inicial. Párrafo de ≤50 palabras enunciando los contenidos básicos del módulo.
   c) Desarrollo: Máx. 2 subtemas por tema central.
      - Título N2: alineado a la izquierda, negrita.
      - Título N3: alineado a la izquierda, negrita, cursiva.
   d) Viñetas: oración comienza con mayúscula y termina en punto. Números solo cuando el orden es fundamental.
   e) Párrafo de conclusión al finalizar el módulo.
   f) Bibliografía: Normas APA 7ma edición (https://normas-apa.org/).

5. CITAS (APA 7):
   - Cita directa <40 palabras: entre comillas, con (Autor, Año, p. X).
   - Cita directa >40 palabras: bloque independiente, sin comillas, con sangría de media pulgada.
   - Cita indirecta/paráfrasis: siempre citar (Autor, Año). La IA NO es fuente citable.

6. IMÁGENES: alta calidad, sin marcas de agua, sin derechos de propiedad. Articular con equipo de gráfica. Numerar correlativamente ("Imagen 1", "Imagen 2"...) e indicar ubicación en el texto.`;
                    break;
                case 'bloque-2':
                    objectiveText = `Crear el "Bloque II: Módulo Audiovisual" (NIVEL BÁSICO) para "${courseName}".`;
                    stepText = `1. GUION para video. Duración: máx. 4 minutos.
2. CARÁCTER según Bloque I:
   - Si Bloque I tiene 2 módulos: video INTEGRADOR que sintetice ambos contenidos.
   - Si Bloque I tiene 1 módulo: video INTRODUCTORIO con nuevos contenidos complementarios.
   - En cursos prácticos (Habilidades Digitales, Word, Excel, etc.): video como GUÍA VISUAL PASO A PASO.
3. IMÁGENES: incluir sugerencias de imágenes conceptuales o indicaciones de qué ilustrar para el banco de imágenes o producción.
4. NOTA: El guion debe pasar por el equipo contenidista correspondiente para su aprobación.`;
                    break;
                case 'evaluacion':
                    objectiveText = `Generar la "Evaluación Integradora" NIVEL BÁSICO para "${courseName}".`;
                    stepText = `1. CANTIDAD: 5 consignas (ítems) fundamentales alineadas con los objetivos básicos.
2. FORMATOS: Múltiple Choice con 4 a 5 opciones de respuesta por ítem.
3. CARÁCTER: Presentar en TABLAS claras y profesionales.
4. MANDATO: ES OBLIGATORIO proporcionar la respuesta correcta y una explicación pedagógica clara para cada consigna.`;
                    break;
                default:
                    objectiveText = `Generar la Estructura Completa de Secuencia Didáctica (SD) NIVEL BÁSICO para "${courseName}".`;
                    stepText = `1. PRESENTACIÓN: Bienvenida (VOS → NOSOTROS) + Guía SD (Nombre, Nivel, Objetivos 2-4 verbos infinitivo, Plan de Trabajo, Mapa del Curso).
2. BLOQUE I: 2 módulos PDF (3-5 carillas, Calibri 11, A4). Estructura: Título N1, Introducción ≤50 pal, Desarrollo máx 2 subtemas, Conclusión, Bibliografía APA 7.
3. BLOQUE II: Guion (máx 4 min). Video INTEGRADOR de los 2 módulos. Con sugerencias de imágenes.
4. EVALUACIÓN: 5 consignas (Múltiple Choice con 4-5 opciones) alineadas a los objetivos. ES OBLIGATORIO incluir las respuestas correctas y explicaciones en formato de TABLA.`;
            }
            executionMandates = `- **CONFIGURACIÓN TÉCNICA POR MÓDULO**: 5.000 Palabras | 30.000 Caracteres | 7.000 Tokens | 12 páginas A4.\n- **ESTRUCTURA MODULAR**: Título N1 centrado/negrita → Introducción ≤50 pal → Desarrollo (explosión de contenido narrativa) → Conclusión → Bibliografía APA 7.\n- **ESTILO DE REDACCIÓN**: Escritura natural, tradicional y pedagógica. NO utilizar viñetas ni listas. El desarrollo debe ser un texto fluido de alta densidad.\n- **CITAS APA 7**: Directa <40 pal entre comillas; >40 pal en bloque con sangría. Paráfrasis: citar autor+año. La IA NO es fuente citable.\n- **IMÁGENES Y VIDEOS**: alta calidad, sin marcas de agua. Articular con equipo de gráfica. Numerar correlativamente. Es OBLIGATORIO incluir vínculos a **Video Tutoriales de YouTube** en español. **VÍNCULOS GARANTIZADOS**: Usa el formato https://www.youtube.com/results?search_query=[TEMA+EN+ESPAÑOL] para evitar links caídos.
- **EXTENSIÓN CRÍTICA**: Se exige la MÁXIMA EXTENSIÓN posible (5.000 palabras por módulo), evitando resúmenes y profundizando en cada punto.
- **BIBLIOGRAFÍA**: Al final de cada entrega, pregunta si se desea la bibliografía en normas APA.
- **EVALUACIÓN**: Todas las preguntas deben basarse estrictamente en la secuencia didáctica y devolver siempre la opción correcta.
- **SIMILITUD ESTRUCTURAL**: Todo el contenido generado debe ser lo más similar posible a la estructura de módulos y bloques del curso.`;
        }

        const activeKeywords = Array.from(document.querySelectorAll('.keyword-tag.active')).map(tag => tag.getAttribute('data-value'));

        if (!courseName || !audience || ejeBase === 'Selecciona un eje base...' || !areaTematica) {
            alert('Por favor, completa los campos obligatorios: Nombre, Público, Eje y Área.');
            return;
        }

        const prompt = `${modelGuideline}

### SYSTEM ROLE (R)
Actúa como un Senior Prompt Engineer y Arquitecto Instruccional de Educación 4.0.
${expertLayer}
Tu objetivo es transformar conceptos en recursos de nivel profesional siguiendo la Secuencia Didáctica (SD) institucional. Operaremos bajo un sistema de **Generación por Etapas** para garantizar la altísima densidad pedagógica requerida.

### CONTEXTO (Context)
Estamos trabajando exclusivamente en el módulo de "Cursos Propios". La restricción técnica es que el contenido debe ser de altísima densidad (mínimo 5.000 palabras por módulo). Para evitar la degradación de calidad o resúmenes prematuros, el flujo de trabajo será iterativo y modular.

### OBJETIVO (Objective)
Actuar como un motor de expansión que trabaje módulo por módulo (o sección por sección), asegurando la máxima extensión y profundidad técnica en cada entrega. No entregues el curso completo de una vez; enfócate en la perfección de la etapa actual.
${objectiveText}

### CONFIGURACIÓN DE CASCADA DE CONTENIDO (Enriquecimiento Técnico)
Debes seguir rigurosamente esta lógica de "Cascada de Contenido":

1. **Fase de Estructuración (Índice de Densidad)**: Antes de redactar, debes proponer un **Índice de Densidad** detallado para los ${isAdvanced ? '6 módulos' : isIntermediate ? '4 módulos' : '2 módulos'} definidos para este nivel (${activeLevel.toUpperCase()}). 
   - Por cada módulo, debes desglosar de 10 a 15 sub-apartados técnicos. 
   - Esta estructura debe ser la "percha" pedagógica que garantice alcanzar la meta de las 5.000 palabras por módulo sin redundancias.
2. **Fase de Expansión Modular**: Una vez aprobada la estructura técnica del índice, debes indicar: "He diseñado el índice de densidad para los ${isAdvanced ? '6' : isIntermediate ? '4' : '2'} módulos. Por favor, dime qué módulo (o sección específica) quieres que desarrolle con máxima extensión (5.000 palabras) ahora".
3. **Mandato de No-Resumen**: Queda PROHIBIDO el uso de frases conclusivas prematuras o resúmenes. Si el contenido no alcanza la densidad necesaria, debes autogenerar una "Rama de Búsqueda Técnica" para profundizar en conceptos específicos.
4. **Bloque 1 (PDF)**: Se descompone en Entregas Individuales. Cada respuesta de salida debe ocuparse de UN módulo a la vez para mantener la potencia informativa de 5.000 palabras.
5. **Explosión de Contenido**: El "Desarrollo" de cada módulo debe ser una explosión de información dividida en al menos 3 partes sustanciales para asegurar el hilo pedagógico y la profundidad técnica universitaria.

### INSTRUCCIONES DE CONFIGURACIÓN Y RESTRICCIONES (Knowledge & Constraints)
1. **Invariabilidad de la Secuencia Didáctica**: Mantener Inicio, Desarrollo y Cierre. El desarrollo debe ser la "Explosión de Contenido" mencionada.
2. **Definición Pedagógica**: Todo el material debe ser original. PROHIBIDO el uso de OER.
3. **Estructura Visual**: Utilizar Mapa Mental (jerarquía visualmente ramificada).
4. **Redacción de Presentación**: Bienvenida (Vos -> Nosotros). ${isIntermediate ? 'EXCLUIR Cronograma / Plan de Trabajo.' : ''}
5. **Evaluación**: ES OBLIGATORIO incluir siempre la respuesta correcta y la aclaración pedagógica en TABLAS.
6. **Restricciones Temáticas**: EXCLUSIÓN CRÍTICA de Justicia social, Juventudes, Lenguaje inclusivo, Educación popular o Educación comunitaria.

### EJECUCIÓN Y POTENCIA (Execution & Density)
- **CONFIGURACIÓN TÉCNICA OBLIGATORIA**:
  - Medida Por Módulo: 5.000 palabras (aprox. 30.000 caracteres | 7.000 tokens | 12 páginas A4).
  - Total del Curso: 10.000 palabras (aprox. 60.000 caracteres | 14.000 tokens | 24 páginas A4).
- **MANDATO DE CUMPLIMIENTO**: Fuerza al modelo a detallar cada concepto utilizando un lenguaje rico y técnico. **Cada módulo desarrollado debe alcanzar la meta de 5.000 palabras.**
- **MAPA MENTAL**: Entregar esquema jerárquico detallado.
${stepText}
${executionMandates}
${activeKeywords.length > 0 ? '- Integra refuerzos técnicos (Ramas de búsqueda): ' + activeKeywords.join(', ') + '.' : ''}

### TONO Y ESTILO (Tone & Style)
El tono debe ser **Académico, Soberano, Detallista y de Nivel Universitario**. El estilo debe ser de **Escritura Natural**, evitando viñetas o numeraciones. La narrativa debe ser fluida, técnica y pedagógica, similar a un curso universitario tradicional de alta gama. Debe reflejar la excelencia pedagógica y la profundidad del pensamiento situado.
### CAPACIDAD DE EXPANSIÓN Y VISUALIZACIÓN
Si el usuario lo solicita en el loop de feedback, estás plenamente capacitado para:
- Diseñar la configuración estética y funcional para **Canva**.
- Esquematizar la estructura técnica para el aula virtual en **Moodle**.
- Generar prototipos en **HTML interactivo** para previsualizar el curso.
- Brindar consejos de expertos sobre didáctica y tecnología educativa.

### INTERACCIÓN OBLIGATORIA (Botonera de Acción)
Al finalizar cada entrega parcial o estructuración, es OBLIGATORIO que presentes un **PANEL DE ACCIONES** visualmente diferenciado para que el usuario elija cómo proceder:

### 🔘 PANEL DE ACCIONES (Elige tu siguiente paso)
- **[ 1. PROFUNDIZAR ]**: Profundizar en un tema específico del **Índice en Percha** anterior para alcanzar la meta de **5.000 palabras / 8.000 tokens**.
- **[ 2. CONTINUAR ]**: Pasar a la siguiente sección (Mantener flujo de alta densidad).
- **[ 3. BIBLIOGRAFÍA ]**: Agregar bibliografía completa en normas APA.
- **[ 4. CUESTIONARIO ]**: Diseñar cuestionario según secuencia didáctica.
- **[ 5. CANVA ]**: Obtener configuración de diseño para Canva.
- **[ 6. MOODLE ]**: Ver estructura en Moodle (Página Web Interactiva).
- **[ 7. VIDEOS ESPECÍFICOS ]**: Buscar y listar Video Tutoriales de YouTube específicos sobre este tema.
- **[ 8. CONSEJOS ]**: Recibir consejos expertos para la implementación.

*Por favor, indica el número o nombre de la opción (y si eliges Profundizar, especifica qué sub-tema del índice).*`;

        // Update UI with Sequential Revelation
        const resultActions = document.querySelector('.result-actions');
        const aiActions = document.getElementById('ai-actions');
        const aiLinks = document.getElementById('ai-links');
        const copyContainer = document.getElementById('copy-container');

        resultActions.classList.add('hidden');
        copyContainer.classList.add('hidden');
        aiActions.classList.add('hidden');
        aiLinks.classList.add('hidden');

        typeWriter(prompt, promptOutput, 5, () => {
            resultActions.classList.remove('hidden');
            copyContainer.classList.remove('hidden');
            aiActions.classList.remove('hidden');
            aiLinks.classList.remove('hidden');
            copyBtn.style.animation = 'pulseGlow 2s infinite';
            updateComplianceScanner(prompt); // Scan the final prompt too
        });

        resultSection.scrollIntoView({ behavior: 'smooth' });
        generateBtn.textContent = '¡Volver a Generar!';
        setTimeout(() => { generateBtn.textContent = 'Generar Prompt Estructurado'; }, 2000);
    });

    const handleCopy = (btn, text, callback) => {
        navigator.clipboard.writeText(text).then(() => {
            const originalText = btn.textContent;
            btn.textContent = '¡Prompt Copiado!';
            const originalBg = btn.style.background;
            btn.style.background = 'rgba(16, 185, 129, 0.4)';

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = originalBg;
                if (callback) callback();
            }, 1000);
        });
    };

    copyBtn.addEventListener('click', () => {
        handleCopy(copyBtn, promptOutput.textContent);
    });

    if (copyGeminiBtn) {
        copyGeminiBtn.addEventListener('click', () => {
            handleCopy(copyGeminiBtn, promptOutput.textContent, () => {
                window.open('https://gemini.google.com', '_blank');
            });
        });
    }

    // Mapa del Curso Logic
    const viewCourseMapBtn = document.getElementById('view-course-map-btn');
    const courseMapModal = document.getElementById('course-map-modal');
    const closeCourseMap = document.getElementById('close-course-map');
    const courseMapTree = document.getElementById('course-map-tree');

    viewCourseMapBtn.addEventListener('click', () => {
        const courseName = document.getElementById('course-name').value.trim() || 'Curso Sin Nombre';
        const area = document.getElementById('area-tematica').value;
        const keywords = Array.from(document.querySelectorAll('.keyword-tag.active')).map(tag => tag.textContent);
        
        generateCourseMapTree(courseName, area, keywords);
        courseMapModal.classList.remove('hidden');
    });

    closeCourseMap.addEventListener('click', () => {
        courseMapModal.classList.add('hidden');
    });

    window.addEventListener('click', (e) => {
        if (e.target === courseMapModal) courseMapModal.classList.add('hidden');
    });

    // Objective Preview Logic
    function updateObjectivePreview() {
        const courseName = document.getElementById('course-name').value.trim() || '[Nombre del Curso]';
        const blockSelect = document.getElementById('block');
        const blockVal = blockSelect.value;
        const blockText = blockSelect.options[blockSelect.selectedIndex].text;
        const levelRadio = document.querySelector('input[name="level"]:checked');
        const level = levelRadio ? levelRadio.value : 'Básico';
        
        let detail = '';
        if (level === 'Básico') detail = '2 módulos PDF (3-5 carillas c/u)';
        else if (level === 'Intermedio') detail = '4 módulos PDF (2-3 páginas c/u)';
        else if (level === 'Avanzado') detail = '6 módulos PDF (4-5 páginas c/u)';
        
        let previewText = '';
        switch (blockVal) {
            case 'presentacion':
                previewText = `Generar la <strong>"Presentación y Guía SD"</strong> [Nivel: ${level}] para el curso <strong>"${courseName}"</strong>.`;
                break;
            case 'bloque-1':
                previewText = `Desarrollar el <strong>"Bloque I: Contenidos"</strong> (${detail}) [Nivel: ${level}] para el curso <strong>"${courseName}"</strong>.`;
                break;
            case 'bloque-2':
                const videos = level === 'Avanzado' ? '2 videos integradores' : (level === 'Intermedio' ? 'Guion de video resumen (3-4 min)' : '1 video (máx 4min)');
                previewText = `Crear el <strong>"Bloque II: Módulo Audiovisual"</strong> (${videos}) [Nivel: ${level}] para el curso <strong>"${courseName}"</strong>.`;
                break;
            case 'evaluacion':
                const items = level === 'Avanzado' ? '15-20 ítems' : (level === 'Intermedio' ? '10 ítems' : '5 consignas');
                previewText = `Generar la <strong>"Evaluación Integradora"</strong> (${items}) [Nivel: ${level}] para el curso <strong>"${courseName}"</strong>.`;
                break;
            default:
                previewText = `Generar la <strong>"Estructura Completa de Secuencia Didáctica (SD)"</strong> (${detail}) [Nivel: ${level}] para el curso <strong>"${courseName}"</strong>.`;
        }
        
        document.getElementById('objective-preview').innerHTML = previewText;
    }

    // Hook up preview updates
    ['course-name', 'block', 'audience', 'eje-base', 'area-tematica'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', updateObjectivePreview);
            el.addEventListener('change', updateObjectivePreview);
        }
    });

    document.querySelectorAll('input[name="level"]').forEach(radio => {
        radio.addEventListener('change', updateObjectivePreview);
    });

    function generateCourseMapTree(title, area, keywords) {
        const levelRadio = document.querySelector('input[name="level"]:checked');
        const level = levelRadio ? levelRadio.value : 'Básico';
        
        let html = `
            <div class="tree-root">
                <div class="node principal level-${level.toLowerCase()}">
                    <i class="fas fa-graduation-cap"></i>
                    <span>${title} (${level.toUpperCase()})</span>
                </div>
                <div class="tree-branches">
        `;

        let modulesCount = 2;
        let videoLabels = [];
        let pagesPerModule = "";
        
        if (level === 'Intermedio') {
            modulesCount = 4;
            videoLabels = ['VIDEO 1: M1 Y M2', 'VIDEO 2: M3 Y M4'];
            pagesPerModule = "2-3 páginas";
        } else if (level === 'Avanzado') {
            modulesCount = 6;
            videoLabels = ['VIDEO 1: M1, M2 Y M3', 'VIDEO 2: M4, M5 Y M6'];
            pagesPerModule = "4-5 páginas";
        } else {
            videoLabels = ['VIDEO INTEGRADOR GLOBAL'];
            pagesPerModule = "3-5 carillas";
        }

        // Rename logic for UI
        const mapTitle = "Mapa Mental";

        // Generate Modules
        html += `<div class="modules-grid-course-map">`;
        for (let i = 1; i <= modulesCount; i++) {
            html += `
                <div class="branch" style="animation-delay: ${0.1 * i}s">
                    <div class="node category">MÓDULO ${i}</div>
                    <div class="node-children">
                        <div class="node leaf">Escritura PDF (${pagesPerModule})</div>
                        <div class="node leaf">Pautas APA 7</div>
                        <div class="node leaf">Actividad Parcial</div>
                    </div>
                </div>
            `;
        }
        html += `</div>`;

        // Generate Videos
        html += `<div class="videos-row-course-map" style="animation-delay: ${0.1 * (modulesCount + 1)}s">`;
        if (level === 'Intermedio') {
            html += `<div class="node video-node"><i class="fas fa-video"></i> VIDEO RESUMEN (3-4 MIN)</div>`;
        } else {
            videoLabels.forEach((label, idx) => {
                html += `
                    <div class="node video-node" style="animation-delay: ${0.1 * (modulesCount + idx + 1)}s">
                        <i class="fas fa-video"></i> ${label}
                    </div>
                `;
            });
        }
        html += `</div>`;

        // Generate Evaluation
        const evalItems = level === 'Avanzado' ? '15-20 ítems' : (level === 'Intermedio' ? '10 ítems' : '5 consignas');
        html += `
            <div class="eval-node-container" style="animation-delay: ${0.1 * (modulesCount + videoLabels.length + 1)}s">
                <div class="node eval-node">
                    <i class="fas fa-check-double"></i> EVALUACIÓN INTEGRADORA (${evalItems})
                </div>
            </div>
        `;

        html += `</div></div>`;
        courseMapTree.innerHTML = html;
        
        // Add specific styles for the course map grid if not present
        if (!document.getElementById('course-map-extra-styles')) {
            const style = document.createElement('style');
            style.id = 'course-map-extra-styles';
            style.innerHTML = `
                .modules-grid-course-map { display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; margin-bottom: 30px; width: 100%; }
                .videos-row-course-map { display: flex; gap: 20px; justify-content: center; width: 100%; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 25px; margin-bottom: 25px; flex-wrap: wrap; }
                .eval-node-container { width: 100%; display: flex; justify-content: center; padding-top: 10px; }
                .node.video-node { background: rgba(99, 102, 241, 0.15); border: 1px solid rgba(99, 102, 241, 0.4); color: #fff; font-size: 0.85rem; font-weight: 600; padding: 0.8rem 1.5rem; display: flex; align-items: center; gap: 10px; border-radius: 12px; }
                .node.eval-node { background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.4); color: #fff; min-width: 300px; box-shadow: 0 10px 20px -5px rgba(16, 185, 129, 0.2); }
                .node.principal.level-básico { background: linear-gradient(135deg, #2e7d32, #1b5e20); }
                .node.principal.level-intermedio { background: linear-gradient(135deg, #1565c0, #01579b); }
                .node.principal.level-avanzado { background: linear-gradient(135deg, #c62828, #b71c1c); }
                .branch { animation: scaleUp 0.4s ease-out both; }
                .node.video-node, .eval-node-container { animation: fadeInUp 0.5s ease-out both; }
                @keyframes scaleUp { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
            `;
            document.head.appendChild(style);
        }
    }

    // Initial Sync
    updateHealthScore();
    updateObjectivePreview();

});
