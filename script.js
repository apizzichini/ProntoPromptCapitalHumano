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
                element.textContent += text.charAt(i);
                i++;
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
        'primera-infancia': ['Cuidados', 'Etapas del desarrollo', 'Nuevos aprendizajes', 'Derechos y protección', 'Estimulación temprana', 'Salud perinatal'],
        'ninez-adolescencia': ['Cuidados', 'Etapas del desarrollo', 'Nuevos aprendizajes', 'Alfabetización digital', 'Inteligencia artificial', 'Educación sexual integral (ESI)', 'Prevención de consumos', 'Liderazgo juvenil'],
        'promocion-humana': ['Desarrollo personal', 'Habilidades para emprender', 'Alfabetización digital', 'Inteligencia artificial', 'Habilidades digitales + Inteligencia artificial', 'Economía social', 'Género y diversidad', 'Discapacidad e inclusión'],
        'adultos-mayores': ['Desarrollo personal', 'Alfabetización digital', 'Inteligencia artificial', 'Habilidades digitales + Inteligencia artificial', 'Vínculo intergeneracional', 'Cultura y recreación', 'Autonomía alimentaria'],
        'alimentacion-nutricion': ['Alimentación saludable y hábitos', 'Producción de alimentos', 'Espacios comunitarios', 'Inocuidad alimentaria', 'Soberanía alimentaria', 'Cocina económica', 'Nutrición comunitaria']
    };

    const keywordsByArea = {
        'transversal': ['Innovador', 'Práctico', 'Inclusivo', 'Dinámico', 'Certificable', 'Sostenible', 'Orientado al Empleo', 'Basado en Proyectos', 'Empoderador', 'Accesible'],
        'Cuidados': ['Acompañamiento', 'Vínculo primario', 'Crianza compartida', 'Seguridad infantil'],
        'Etapas del desarrollo': ['Hitos del crecimiento', 'Motricidad gruesa/fina', 'Lenguaje', 'Neurodesarrollo'],
        'Estimulación temprana': ['Juego libre', 'Sensorial', 'Exploración', 'Entorno seguro'],
        'Alfabetización digital': ['Ciudadanía virtual', 'Seguridad en redes', 'Pensamiento crítico', 'Creación de contenido'],
        'Inteligencia artificial': ['Prompt engineering', 'Ética en algoritmos', 'Herramientas educativas', 'Automatización'],
        'Habilidades para emprender': ['Modelo de negocios', 'Marketing digital', 'Costos y precios', 'Propuesta de valor'],
        'Soberanía alimentaria': ['Compostaje', 'Siembra', 'Soberanía', 'Biodiversidad'],
        'Inocuidad alimentaria': ['Higiene', 'Conservación', 'Manipulación certificada', 'ETAS'],
        'Liderazgo juvenil': ['Oratoria', 'Trabajo en equipo', 'Proyectos comunitarios', 'Voz adolescente'],
        'Economía social': ['Cooperativismo', 'Comercio justo', 'Finanzas solidarias', 'Asociatividad'],
        'Género y diversidad': ['Perspectiva de género', 'Identidades', 'Violencias', 'Equidad'],
        'Autonomía alimentaria': ['Huerta en macetas', 'Presupuesto familiar', 'Hábitos preventivos', 'Cocina saludable']
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
            });
            keywordContainer.appendChild(span);
        });
    };

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

    // Initial keyword load
    updateKeywords('transversal');

    // Intention Detection Logic
    const sparkleContainer = document.getElementById('sparkle-suggestion');
    const intensionMap = {
        'ia': 'Inteligencia Artificial',
        'computadora': 'Alfabetización Digital',
        'salud': 'Alimentación y Nutrición',
        'dinero': 'Economía Social',
        'niño': 'Primera Infancia',
        'abuelo': 'Adultos Mayores',
        'negocio': 'Habilidades para emprender'
    };

    document.getElementById('course-name').addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase();
        sparkleContainer.innerHTML = '';

        for (const [key, area] of Object.entries(intensionMap)) {
            if (val.includes(key)) {
                const suggestion = document.createElement('div');
                suggestion.className = 'magic-btn';
                suggestion.style.animation = 'fadeIn 0.5s ease-out';
                suggestion.textContent = `✨ Vincular con ${area}`;
                sparkleContainer.appendChild(suggestion);
                break;
            }
        }
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
        const courseName = document.getElementById('course-name').value.trim();
        const audience = document.getElementById('audience').value;
        const ejeVal = ejeBaseSelect.value;
        const areaVal = areaTematicaSelect.value;
        const blockVal = document.getElementById('block').value;
        const keywords = document.querySelectorAll('.keyword-tag.active').length;

        const scores = {
            nombre: Math.min(courseName.length / 20, 1),
            publico: audience ? 1 : 0,
            eje: ejeVal ? 1 : 0,
            area: areaVal ? 1 : 0,
            bloque: blockVal && blockVal !== 'estructura-completa' ? 1 : (blockVal === 'estructura-completa' ? 0.8 : 0),
            keywords: Math.min(keywords / 3, 1)
        };

        updateRadar(scores);

        const total = Math.round((Object.values(scores).reduce((a, b) => a + b, 0) / RADAR_AXES.length) * 100);
        const scoreArc = document.getElementById('score-arc');
        const circumference = 264;
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

        document.getElementById('score-number').textContent = total + '%';

        // Update metric items
        const metricMap = [
            { id: 'metric-nombre', val: courseName || '—', score: scores.nombre },
            { id: 'metric-publico', val: audience ? document.getElementById('audience').options[document.getElementById('audience').selectedIndex].text : '—', score: scores.publico },
            { id: 'metric-eje', val: ejeVal ? ejeBaseSelect.options[ejeBaseSelect.selectedIndex].text : '—', score: scores.eje },
            { id: 'metric-area', val: areaVal || '—', score: scores.area },
            { id: 'metric-bloque', val: blockVal ? document.getElementById('block').options[document.getElementById('block').selectedIndex].text : '—', score: scores.bloque },
            { id: 'metric-keywords', val: keywords > 0 ? `${keywords} seleccionadas` : '—', score: scores.keywords }
        ];

        metricMap.forEach(({ id, val, score }) => {
            const el = document.getElementById(id);
            const dot = el.querySelector('.metric-dot');
            const valEl = el.querySelector('.metric-val');
            valEl.textContent = val.length > 18 ? val.substring(0, 18) + '…' : val;

            el.classList.remove('active', 'excellent');
            dot.classList.remove('active', 'inactive', 'excellent');

            if (score >= 1) {
                el.classList.add('excellent');
                dot.classList.add('excellent');
            } else if (score > 0) {
                el.classList.add('active');
                dot.classList.add('active');
            } else {
                dot.classList.add('inactive');
            }
        });
    }

    initRadar();
    updateHealthScore();

    // Wire up listeners
    document.getElementById('course-name').addEventListener('input', updateHealthScore);
    document.getElementById('audience').addEventListener('change', updateHealthScore);
    ejeBaseSelect.addEventListener('change', updateHealthScore);
    areaTematicaSelect.addEventListener('change', updateHealthScore);
    document.getElementById('block').addEventListener('change', updateHealthScore);
    document.getElementById('keyword-container').addEventListener('click', () => setTimeout(updateHealthScore, 50));

    // ===== END SALUD DEL PROMPT =====

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

        const activeKeywords = Array.from(document.querySelectorAll('.keyword-tag.active')).map(tag => tag.getAttribute('data-value'));

        if (!courseName || !audience || ejeBase === 'Selecciona un eje base...' || !areaTematica) {
            alert('Por favor, completa los campos obligatorios: Nombre, Público, Eje y Área.');
            return;
        }

        let objectiveText = '';
        let stepText = '';

        switch (block) {
            case 'presentacion':
                objectiveText = `Generar la "Presentación y Guía SD" para el curso "${courseName}".`;
                stepText = `1. Bienvenida (a la plataforma y al curso): 1er párrafo con pronombre "VOS", 2do párrafo con "NOSOTROS".\n2. Guía del curso: Nombre (corto, conciso, atractivo), Nivel, Objetivos y Plan de Trabajo.\n3. Referencia al Mapa del Curso (espejo fiel de contenidos).`;
                break;
            case 'bloque-1':
                objectiveText = `Desarrollar el "Bloque I: Contenidos" (1 o 2 módulos PDF) para el curso "${courseName}".\n\n### REGLA DE ORO INELUDIBLE:\nCada módulo/bloque DEBE tener una extensión EXACTA de 2500 PALABRAS. No se aceptan resúmenes ni textos breves. La IA debe explicar detalladamente cada concepto hasta alcanzar la cifra de 2500 palabras por módulo.`;
                stepText = `1. Desarrollar contenido técnico con EXPLICACIONES PROFUNDAS (Obligatorio: 2500 palabras exactas por módulo).\n2. Incluir sugerencias de imágenes conceptuales, gráficos y tablas.\n3. Prohibido omitir detalles; cada subtema debe ser expandido exhaustivamente.`;
                break;
            case 'bloque-2':
                objectiveText = `Crear el "Bloque II: Módulo Audiovisual" para "${courseName}".`;
                stepText = `1. Armar Guion (máx 4 min) con sugerencias de imágenes conceptuales para ilustrar.\n2. Carácter: ${courseName.toLowerCase().includes('habilidades digitales') ? 'Guía visual paso a paso.' : 'INTEGRADOR (si hay 2 módulos previos) o INTRODUCTORIO (si hay 1 módulo previo).'}\n3. Debe incluir sugerencias visuales técnicas.`;
                break;
            case 'evaluacion':
                objectiveText = `Generar la "Evaluación Integradora" de 5 consignas para "${courseName}".`;
                stepText = `1. Formatos: Múltiple Choice (4-5 respuestas), Verdadero/Falso, Sopa de letras o Crucigrama.\n2. Alineada a objetivos centrales como instancia de aprendizaje.`;
                break;
            default:
                objectiveText = `Generar Estructura Completa de Secuencia Didáctica (SD) para "${courseName}".`;
                stepText = `1. Presentación (Vos -> Nosotros).\n2. Bloque I (2 módulos PDF: EXIGENCIA DE 2500 PALABRAS EXACTAS POR CADA MÓDULO).\n3. Bloque II (Video de 4 min con guion e imágenes conceptuales).\n4. Evaluación (5 consignas variadas: Choice, V/F, Crucigrama).`;
                break;
        }

        const prompt = `### SYSTEM ROLE (R)
Actúa como un Diseñador Instruccional Senior para Formando Capital Humano. Tu objetivo es transformar conceptos en recursos de nivel profesional siguiendo la Secuencia Didáctica (SD) institucional y las pautas de redacción oficiales.

### OBJECTIVE (O)
${objectiveText}

### CONTEXT & PARAMETERS (C)
- **Generado por:** Tutor Docente Profesional de Capital Humano (Coordinación de Alimentar).
- **Curso:** ${courseName}
- **Referencia Institucional:** Formando Capital Humano.
- **Área Temática:** ${areaTematica}
- **Beneficiarios:** ${audience}
- **Estrategia:** Enfoque ${pedagogy} con tono ${tone}.

### KNOWLEDGE BASE (K) - Pautas Institucionales & Estrategia "Modo IA"
1. **Redacción de Presentación**: Bienvenida (Vos -> Nosotros). Pestaña para equipo de carga. Incluye Guía SD y referencia a Mapa (espejo contenido).
2. **Bloque I (PDF) - ESTRATEGIA DE RAMIFICACIÓN**: REQUISITO INNEGOCIABLE: 2500 PALABRAS. Para lograrlo, utiliza la **"Ramificación de Búsquedas"**: divide el tema en múltiples subtemas técnicos y busca cada uno simultáneamente para extraer contenido denso y veraz.
3. **Bloque II (Video)**: Guion máx 4 min. Si Bloque I tiene 2 módulos -> Video INTEGRADOR. Si hay 1 módulo -> Video INTRODUCTORIO. Guía paso a paso en cursos prácticos. Sugerir imágenes conceptuales.
4. **Evaluación**: 5 consignas (V/F, Choice, Sopa de letras, Crucigrama). Instancia de aprendizaje alineada a objetivos.
5. **Verificación de Datos**: Comprobar información en múltiples fuentes (mínimo 3 sitios). Si hay ambigüedad, priorizar el contexto de Formando Capital Humano.

### EXECUTION STEPS (E)
${stepText}
- **MANDATO "MODO IA"**: Utiliza tu capacidad de explorar conceptos nuevos y comparar opciones para expandir el texto. **DEBES escribir exactamente 2500 palabras por módulo**. 
- Si el contenido es insuficiente, aplica una nueva rama de búsqueda sobre los subconceptos técnicos detectados.
- El contenido debe estar equilibrado hacia la ${tone}.
- Títulos: N1 (Centrado), N2 (Izquierda), N3 (Izquierda+Cursiva). Negrita y Mayúsculas iniciales.
- Viñetas: Mayúscula inicial y PUNTO FINAL.
- Utilizar lenguaje sencillo, claro y accesible para ${audience}. 1ra persona plural ("Nosotros").
- Definir términos técnicos claramente. Evitar exceso de citas.
${activeKeywords.length > 0 ? '- Integra refuerzos técnicos (Ramas de búsqueda): ' + activeKeywords.join(', ') + '.' : ''}

[VALIDACIÓN DE ALINEACIÓN]
Si "${courseName}" no vincula con "${areaTematica}", marca con [REFERENCIA A MODIFICAR].

### TONE & STYLE (T)
Utiliza un tono ${tone}. Comunicación profesional y motivadora. Recursos sugeridos: Infografías, descargables e imágenes conceptuales.`;

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
                window.open('https://www.google.com/ai', '_blank');
            });
        });
    }

    // Initial Dashboard Sync
    updateDashboard();

});
