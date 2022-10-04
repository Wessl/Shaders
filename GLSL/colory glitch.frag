// https://www.shadertoy.com/view/NtGfz3
// made this while learning shaders on thebookofshaders.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#define PI 3.14159265358979323846

vec2 rotate2D(vec2 _st, float _angle){
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

vec2 tile(vec2 _st, float _zoom){
    _st *= _zoom;
    return fract(_st);
}

float box(vec2 _st, vec2 _size, float _smoothEdges){
    _size = vec2(0.5)-_size*0.5;
    vec2 aa = vec2(_smoothEdges*0.5);
    vec2 uv = smoothstep(_size,_size+aa,_st);
    uv *= smoothstep(_size,_size+aa,vec2(1.0)-_st);
    return uv.x*uv.y;
}

void main(void){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    // Divide the space in 4
    st = tile(st,floor(sin(4.*u_time)*4.));

    // Use a matrix to rotate the space 45 degrees
    st = rotate2D(st,pow(PI*0.25,sin(u_time*3.14)));

    // Draw a square
     st+=fract(st.x*u_time);
    color = vec3(box(st,vec2(0.7),0.01));
    
    color *= vec3(sin(u_time*3.14159)+0.1,sin(u_time*1.716)+0.1,cos(u_time/2.)*1.5+0.1);
   
    // color = vec3(st,0.0);

    gl_FragColor = vec4(color,1.0);
}
